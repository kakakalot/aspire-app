import React, {useEffect, PropsWithChildren} from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  List,
  Item,
  ListItem,
  Title,
  Body,
} from 'native-base';
import {DateTime} from 'luxon';
import {useNavigation} from 'react-native-navigation-hooks';

import {DATE_TIME_FORMAT} from '@app/configs';
import {useStore} from '@app/store';
import {RepaymentStatus} from '@app/types';

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
