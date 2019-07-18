import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ListStyleTypes from './ListStyleTypes';

const StyleTypes = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ListStyleTypes baseObject="StyleTypes"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(StyleTypes);