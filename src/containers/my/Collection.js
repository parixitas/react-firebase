import React from 'react';

import AuthUserContext from '../../components/auth/AuthUserContext';
import withAuthorization from '../../components/auth/withAuthorization';

import { Container, Row, Col } from 'reactstrap';


const Collection = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <Container>
                <Row>
                    <Col>
                    <h1>Your Public Collection</h1>
                    <p>This is your public collection dashboard</p>
                    </Col>
                </Row>
            </Container>
        }
    </AuthUserContext.Consumer>


// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Collection);