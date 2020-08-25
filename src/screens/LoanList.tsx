import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  Container,
  View,
  Icon,
  Fab,
  Text,
  List,
  ListItem,
  H1,
  Content,
  Body,
  Right,
  Button,
} from 'native-base';
import {useNavigation} from 'react-native-navigation-hooks';
import {RefreshControl, ScrollView} from 'react-native';

import colors from '../colors';
import {useStore} from '../store';
import {LoanStatus} from '../types';

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
  const {push, mergeOptions} = useNavigation();
  const {dataStore} = useStore();
  const {onRefresh, refreshing} = useRefresh();
  const createLoanPress = () => {
    push({component: {name: 'SubmitLoan'}});
  };

  useEffect(() => {
    mergeOptions({topBar: {title: {text: 'Loan list'}}});
  });

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
              const dateString = new Date(
                loan?.createDate as number,
              ).toLocaleDateString();
              return (
                <ListItem
                  key={id}
                  onPress={() =>
                    push({
                      component: {name: 'LoanDetail', passProps: {loanId: id}},
                    })
                  }>
                  <Body>
                    <Text>{`Amount: ${loan?.amount}, Rate: ${loan?.rate}`}</Text>
                    <Text
                      style={textByStatus(
                        loan?.status,
                      )}>{`Status: ${loan?.status}`}</Text>
                    <Text note>{`Create date: ${dateString}`}</Text>
                  </Body>
                  <Right>
                    {(loan?.status === LoanStatus.Approved ||
                      loan?.status === LoanStatus.Repaying) && (
                      <Button
                        small
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
      return {backgroundColor: colors.green, color: colors.white};
    default:
      return {};
  }
};

export default observer(LoanList);
