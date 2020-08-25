import React, {useEffect, useState, PropsWithChildren} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Label,
  List,
  Item,
  ListItem,
  Title,
  Left,
  Body,
} from 'native-base';
import {DateTime} from 'luxon';
import {useNavigation} from 'react-native-navigation-hooks';
import {View} from 'react-native';

import {DATE_TIME_FORMAT} from '../configs';
import colors from '../colors';
// import {useLoadingScreen} from './Loading';
import {useStore} from '../store';
import { RepaymentStatus } from '../types';

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

  return (
    <Container>
      <Content style={{padding: 32}}>
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
        <Title style={{marginTop: 32}}>
          <Text>Repayment schedule</Text>
        </Title>
        <List style={{paddingBottom: 64}}>
          {loan?.repaymentSchedule.map((v, index) => {
            let timeString;
            if (v.doneDate) {
              timeString = DateTime.fromMillis(v.doneDate).toFormat(
                DATE_TIME_FORMAT,
              );
            } else {
              timeString = 'N/A';
            }
            return (
              <React.Fragment key={index}>
                <ListItem>
                  <Body>
                    <Text note>{`Week ${index + 1}`}</Text>
                    <Text
                      note={
                        v.status === RepaymentStatus.Done
                      }>{`Repay date:\n${timeString}`}</Text>
                  </Body>
                  <Text>{`Status: ${v.status}`}</Text>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default LoanDetail;
