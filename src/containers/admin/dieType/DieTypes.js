import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ListDieTypes from './ListDieTypes';

const DieTypes = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ListDieTypes baseObject="DieTypes"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DieTypes);