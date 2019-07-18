import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ListProductLines from './ListProductLines';

const ProductLines = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ListProductLines baseObject="ProductLines"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ProductLines);