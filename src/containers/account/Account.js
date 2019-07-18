import React from 'react';
import AuthUserContext from '../../components/auth/AuthUserContext';
import { PasswordForgotForm } from '../../components/auth/PasswordForgot';
import PasswordChangeForm from '../../components/auth/PasswordChange';
import withAuthorization from '../../components/auth/withAuthorization';
import { Container, Row, Col } from 'reactstrap';

const AccountPage = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <Container>
                <Row>
                    <Col>
                        <h1>Your Account</h1>
                        <p>At the moment we only allow Facebook logins, so please reset your password through Facebook and not here...</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PasswordForgotForm email={authUser.email}/>
                    </Col>
                </Row>
                <Row>
                    <Col><hr/></Col>
                </Row>
                <Row>
                    <Col>
                        <PasswordChangeForm/>
                    </Col>
                </Row>
            </Container>
        }
    </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(AccountPage);
