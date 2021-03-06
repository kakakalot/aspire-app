import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Label,
  Input,
  Item,
} from 'native-base';
import {useNavigation} from 'react-native-navigation-hooks';
import {View} from 'react-native';
// import {Navigation} from 'react-native-navigation';

import colors from '@app/colors';
import {useLoadingScreen} from '@app/screens/Loading';
import {useStore} from '@app/store';
import {wait} from '@app/utils';

type LoanDataState = {
  loading: boolean;
  amount: string;
  weeks: string;
};

const useSubmitLoan = () => {
  // const {pop} = useNavigation();
  const {show, dismiss} = useLoadingScreen();
  const [state, setState] = useState<LoanDataState>({} as LoanDataState);
  const {dataStore} = useStore();
  const submit = async () => {
    const amount = Number(state.amount);
    const weeks = Number(state.weeks);
    if (amount === 0 || isNaN(amount) || weeks === 0 || isNaN(weeks)) {
      return;
    }

    await show();
    setState({...state, loading: true});
    await dataStore.submitLoan(amount, weeks);

    wait(2 * 1000);
    await dismiss();
    // await pop();
  };

  return {submit, state, setState};
};

const SubmitLoan = () => {
  const {submit, state, setState} = useSubmitLoan();
  const {mergeOptions} = useNavigation();

  useEffect(() => {
    mergeOptions({topBar: {title: {text: 'Submit loan'}}});
  });

  return (
    <Container>
      <Content style={{flex: 1, padding: 32}}>
        <Form>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input
              maxLength={15}
              value={state.amount}
              keyboardType="numeric"
              onChangeText={(text) => {
                setState({...state, amount: text.replace(/[^0-9]/g, '')});
              }}
            />
          </Item>
          <Item style={{marginTop: 16}} stackedLabel>
            <Label>Period you want to repay (weeks)</Label>
            <Input
              maxLength={2}
              value={state.weeks}
              keyboardType="numeric"
              onChangeText={(text) => {
                setState({...state, weeks: text.replace(/[^0-9]/g, '')});
              }}
            />
          </Item>
        </Form>
        <Button
          full
          disabled={state.loading}
          style={{marginTop: 32, backgroundColor: colors.primary}}
          onPress={submit}>
          <Text>{'Submit'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default SubmitLoan;
