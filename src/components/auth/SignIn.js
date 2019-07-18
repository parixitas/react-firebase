import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, Input, Button} from 'reactstrap';
import { FaFacebookSquare, FaGooglePlusSquare } from 'react-icons/fa';
import { SignUpLink } from './SignUp';
import { PasswordForgotLink } from './PasswordForgot';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes'

const SignInPage = ({ history }) => {
    return (
        <Container>
            <Row>
                <Col md={{ size: 8, offset: 2}}>
                    <Container>
                        <Row>
                            <Col>
                                <h1>SignIn</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SignInForm history={history} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right">
                                <PasswordForgotLink />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <SignInWithFacebook history={history}/>
                            </Col>
                            <Col xs="6">
                                <SignInWithGoogle history={history}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right">
                                <hr/>
                                <SignUpLink />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const INITIAL_SOCIAL_STATE = {
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
        })
        .catch(error => {
            this.setState(byPropKey('error',error));
        });
        e.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid = 
            password === '' ||
            email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <Input 
                    value={email}
                    onChange={e => this.setState(byPropKey('email', e.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <Input 
                    value={password}
                    onChange={e => this.setState(byPropKey('password', e.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <Button disabled={isInvalid} type="submit" block>
                    Sign In
                </Button>

                { error && <p>{error.message}</p>}
            </Form>
        );
    }
}


export class SignInWithFacebook extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_SOCIAL_STATE };
    }

    onClick = (e) => {
        const {
            history,
        } = this.props;

        auth.doSignInWithFacebook()
            .then(socialAuthUser => {
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        e.preventDefault();
    }

    render() {
        const {
            error, 
        } = this.state;
        return (
            <div>
                <Button color="primary" onClick={this.onClick} block><FaFacebookSquare /> Sign in </Button>
                {error && <p>{error.message}</p>}
            </div>
        )
    }
        
}

class SignInWithGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_SOCIAL_STATE };
    }

    onClick = (e) => {
        const {
            history,
        } = this.props;

        auth.doSignInWithGoogle()
            .then(socialAuthUser => {
                // const authUser = socialAuthUser.user;
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        e.preventDefault();
    }

    render() {
        const {
            error, 
        } = this.state;
        return (
            <div>
                <Button onClick={this.onClick} block> <FaGooglePlusSquare  /> Sign in </Button>
                {error && <p>{error.message}</p>}
            </div>
        )
    }
        
}

export default withRouter(SignInPage);

export {
    SignInForm,
};
