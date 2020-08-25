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

import colors from '../colors';
// import {useLoadingScreen} from './Loading';
import {useStore} from '../store';

type LoanDataState = {
  loading: boolean;
  amount: string;
  rate: string;
};

const useSubmitLoan = () => {
  const {pop} = useNavigation();
  const [state, setState] = useState<LoanDataState>({} as LoanDataState);
  const {dataStore} = useStore();
  const submit = async () => {
    const amount = Number(state.amount);
    const rate = Number(state.rate);
    if (amount === 0 || isNaN(amount) || rate === 0 || isNaN(rate)) {
      return;
    }
    setState({...state, loading: true});
    await dataStore.submitLoan(amount, rate);
    // setTimeout(() => setState({...state, loading: false}), 2000);
    await pop();
    // setState({...state, loading: false});
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
              value={state.amount}
              onChangeText={(text) => {
                setState({...state, amount: text.replace(/[^0-9]/g, '')});
              }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Rate</Label>
            <Input
              maxLength={2}
              value={state.rate}
              onChangeText={(text) => {
                setState({...state, rate: text.replace(/[^0-9]/g, '')});
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

export default SubmitLoan;
