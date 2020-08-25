import React, {useEffect, useState, PropsWithChildren} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Label,
  Input,
  Item,
  ListItem,
} from 'native-base';
import {useNavigation} from 'react-native-navigation-hooks';
import {View} from 'react-native';

import colors from '../colors';
// import {useLoadingScreen} from './Loading';
import {useStore} from '../store';

type LoanDataState = {
  loading: boolean;
  repay: string;
};

type LoanDetailProps = PropsWithChildren<{}> & {
  loanId?: string;
};

const LoanDetail = ({loanId = ''}: LoanDetailProps) => {
  const {dataStore} = useStore();
  const loan = dataStore.loans.get(loanId);
  const {mergeOptions, pop} = useNavigation();
  const dateString = new Date(loan?.createDate as number).toLocaleDateString();

  useEffect(() => {
    mergeOptions({topBar: {title: {text: 'Loan detail'}}});
  });

  const back = () => pop();

  return (
    <Container>
      <Content style={{flex: 1, padding: 32}}>
        <Form>
          <Item>
            <Text>{`Loan ID: ${loan?.id}`}</Text>
          </Item>
          <Item>
            <Text>{`Amount: ${loan?.amount}`}</Text>
          </Item>
          <Item>
            <Text>{`Create date: ${dateString}`}</Text>
          </Item>
          <Item>
            <Text>{`Status: ${loan?.status}`}</Text>
          </Item>
        </Form>
        <Button
          full
          color={colors.primary}
          style={{marginTop: 32}}
          onPress={back}>
          <Text>{'BACK'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoanDetail;
