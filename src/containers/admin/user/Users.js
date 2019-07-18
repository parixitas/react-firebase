import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ListUsers from './ListUsers';

const Users = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ListUsers baseObject="Users"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
//const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Users);