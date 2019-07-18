import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ListSingleDice from './ListSingleDice';

const SingleDice = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ListSingleDice uid={authUser.uid} baseObject="SingleDice"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(SingleDice);