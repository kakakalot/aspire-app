import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {DateTime} from 'luxon';
import {
  Container,
  View,
  Icon,
  Fab,
  Text,
  List,
  ListItem,
  Content,
  Body,
  Right,
  Button,
} from 'native-base';
import {useNavigation} from 'react-native-navigation-hooks';
import {RefreshControl, ScrollView} from 'react-native';

import {DATE_TIME_FORMAT} from '@app/configs';
import colors from '@app/colors';
import {useStore} from '@app/store';
import {LoanStatus} from '@app/types';

const useRefresh = () => {
  const {dataStore} = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await dataStore.updateLoans();
    setRefreshing(false);
  };
  return {refreshing, onRefresh};
};

const LoanList = () => {
  const {push} = useNavigation();
  const {dataStore} = useStore();
  const {onRefresh, refreshing} = useRefresh();
  const createLoanPress = () => {
    push({component: {name: 'SubmitLoan'}});
  };

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }>
        <Content>
          <List>
            {dataStore.loanIds.map((id) => {
              const loan = dataStore.loans.get(id);
              const dateString = DateTime.fromMillis(
                loan?.createDate as number,
              ).toFormat(DATE_TIME_FORMAT);
              return (
                <ListItem
                  key={id}
                  onPress={() =>
                    push({
                      component: {name: 'LoanDetail', passProps: {loanId: id}},
                    })
                  }>
                  <Body>
                    <Text>{`Amount: ${loan?.amount}`}</Text>
                    <Text>{`Period to repay: ${loan?.repaymentSchedule.length} weeks`}</Text>
                    <Text
                      style={textByStatus(
                        loan?.status,
                      )}>{`Status: ${loan?.status}`}</Text>
                    <Text note>{`Create date: ${dateString}`}</Text>
                  </Body>
                  <Right>
                    <Button
                      small
                      style={{backgroundColor: colors.primary}}
                      onPress={() =>
                        push({
                          component: {
                            name: 'LoanDetail',
                            passProps: {loanId: id},
                          },
                        })
                      }>
                      <Text>{'Detail'}</Text>
                    </Button>
                    <View style={{height: 16}} />
                    {(loan?.status === LoanStatus.Approved ||
                      loan?.status === LoanStatus.Repaying) && (
                      <Button
                        small
                        style={{backgroundColor: colors.primary}}
                        onPress={() =>
                          push({
                            component: {
                              name: 'RepayLoan',
                              passProps: {loanId: id},
                            },
                          })
                        }>
                        <Text>{'Repay'}</Text>
                      </Button>
                    )}
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </ScrollView>
      <Fab
        style={{backgroundColor: colors.primary}}
        position="bottomRight"
        onPress={createLoanPress}>
        <Icon name="plus" type="FontAwesome" />
      </Fab>
    </Container>
  );
};

const textByStatus = (status: LoanStatus | undefined) => {
  switch (status) {
    case LoanStatus.Approved:
      return {backgroundColor: colors.primary, color: colors.white};
    case LoanStatus.Repaying:
      return {backgroundColor: colors.primaryAccent, color: colors.white};
    case LoanStatus.Finished:
      return {backgroundColor: colors.green, color: colors.white};
    default:
      return {};
  }
};

export default observer(LoanList);
