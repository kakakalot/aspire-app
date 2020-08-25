import React, {useEffect, useState, ComponentProps, PropsWithChildren} from 'react';
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

const useRepayLoan = (loanId: string) => {
  // const {show, dismiss} = useLoadingScreen();
  const {pop} = useNavigation();
  const [state, setState] = useState<LoanDataState>({} as LoanDataState);
  const {dataStore} = useStore();
  const loan = dataStore.loans.get(loanId);
  const submit = async () => {
    const repay = Number(state.repay);
    if (repay === 0 || isNaN(repay)) {
      return;
    }
    setState({...state, loading: true});
    // await show();
    console.log(state);
    // await dataStore.submitLoan(amount, rate);
    // setTimeout(() => setState({...state, loading: false}), 2000);
    await pop();
    // setState({...state, loading: false});
  };

  return {submit, state, setState, loan};
};

type RepayLoanProps = PropsWithChildren<{}> & {
  loanId?: string;
};

const RepayLoan = ({loanId = ''}: RepayLoanProps) => {
  const {submit, state, setState, loan} = useRepayLoan(loanId);
  const {mergeOptions} = useNavigation();
  const dateString = new Date(loan?.createDate as number).toLocaleDateString();

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
          <Item stackedLabel>
            <Label>Please input your repayment</Label>
            <Input
              value={state.repay}
              onChangeText={(text) => {
                setState({...state, repay: text.replace(/[^0-9]/g, '')});
              }}
            />
          </Item>
        </Form>
        <Button
          full
          disabled={state.loading}
          color={colors.primary}
          style={{marginTop: 32}}
          onPress={submit}>
          <Text>{'Submit'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RepayLoan;
