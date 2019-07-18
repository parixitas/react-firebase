import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ListCollections from './ListCollections';

const Collections = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ListCollections uid={authUser.uid} baseObject="Collections"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Collections);