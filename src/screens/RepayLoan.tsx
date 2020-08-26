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
  Title,
} from 'native-base';
import {useNavigation} from 'react-native-navigation-hooks';
import {View} from 'react-native';

import colors from '../colors';
import {useStore} from '../store';
import {RepaymentStatus} from '../types';

type LoanDataState = {
  loading: boolean;
};

const useRepayLoan = (loanId: string) => {
  // const {show, dismiss} = useLoadingScreen();
  const {pop} = useNavigation();
  const [state, setState] = useState<LoanDataState>({} as LoanDataState);
  const {dataStore} = useStore();
  const loan = dataStore.loans.get(loanId);
  const submit = async () => {
    setState({...state, loading: true});
    // await show();
    // console.log(state);
    await dataStore.repayLoan(loanId);
    await pop();
  };

  return {submit, state, setState, loan};
};

type RepayLoanProps = PropsWithChildren<{}> & {
  loanId?: string;
};

const RepayLoan = ({loanId = ''}: RepayLoanProps) => {
  const {submit, state, loan} = useRepayLoan(loanId);
  const {mergeOptions} = useNavigation();
  const dateString = new Date(loan?.createDate as number).toLocaleDateString();
  const currentWeek =
    loan?.repaymentSchedule.findIndex(
      (v) => v.status !== RepaymentStatus.Done,
    ) || 0;

  useEffect(() => {
    mergeOptions({topBar: {title: {text: 'Repay loan'}}});
  });

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
          <View style={{height: 32}} />
          <Title>
            <Text>{`You are repaying for week ${currentWeek + 1}`}</Text>
          </Title>
        </Form>
        <Button
          full
          disabled={state.loading}
          color={colors.primary}
          style={{marginTop: 32, backgroundColor: colors.primary}}
          onPress={submit}>
          <Text>{'Repay'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RepayLoan;
