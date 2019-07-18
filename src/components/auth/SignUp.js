import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { Container, Row, Col, Form, FormGroup, Input, Button, FormText} from 'reactstrap';
import { FaFacebookSquare, FaGooglePlusSquare } from 'react-icons/fa';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) => {
    return (
        <Container>
            <Row>
                <Col md={{ size: 8, offset: 2}}>
                    <Container>
                        <Row>
                            <Col>
                                <h1>SignUp</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SignUpForm history={history}/>
                                <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <SignupWithFacebook history={history}/>
                            </Col>
                            <Col xs="6">
                                <SignupWithGoogle history={history}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_SOCIAL_STATE = {
    error: null,
};

export class SignupWithFacebook extends Component {
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
                const authUser = socialAuthUser.user;

                db.doCreateUser(authUser.uid, "", authUser.email || "", authUser.displayName, authUser.photoURL)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_SOCIAL_STATE}));
                        history.push(routes.HOME);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error))
            });
        e.preventDefault();
    }

    render() {
        const {
            error,
        } = this.state;

        return (
            <Form>
                <FormGroup>
                    <Button onClick={this.onClick} block={this.props.isBlock} size={this.props.size} color={this.props.color} className={this.props.className}><FaFacebookSquare /> Sign Up </Button>
                    <FormText>
                        {error && <p>{error.message}</p>}
                    </FormText>
                </FormGroup>
            </Form>
        );
    }
}

class SignupWithGoogle extends Component {
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
            const authUser = socialAuthUser.user;
            db.doCreateUser(authUser.uid, "", authUser.email || "", authUser.displayName, authUser.photoURL)
                .then(() => {
                    this.setState(() => ({ ...INITIAL_SOCIAL_STATE}));
                    history.push(routes.HOME);
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                });
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
            <Form>
                <FormGroup>
                    <Button onClick={this.onClick} block><FaGooglePlusSquare /> Google</Button>
                    <FormText>
                        {error && <p>{error.message}</p>}
                    </FormText>
                </FormGroup>
            </Form>
        );
    }
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const {
            username, 
            email, 
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.HOME);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        
        e.preventDefault();
    }

    render() {
        const {
            username, 
            email, 
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' || 
            email === '' || 
            username === '';

        return(
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Input
                        value={username}
                        onChange={e => this.setState(byPropKey('username', e.target.value))}
                        type="text"
                        placeholder="Full Name"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={email}
                        onChange={e => this.setState(byPropKey('email', e.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={passwordOne}
                        onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                        type="text"
                        placeholder="Password"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={passwordTwo}
                        onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                        type="text"
                        placeholder="Confirm Password"
                    />
                </FormGroup>
                <FormGroup>
                    <Button disabled={isInvalid} type="submit" block>
                        Sign Up
                    </Button>
                    <FormText>
                        { error && <p>{error.message}</p>}
                    </FormText>
                </FormGroup>
            </Form>
        )
    }
}


const SignUpLink = () => {
    return(
        <p>
            Don't have an account?
            {` `}
            <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
    )
}

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
}
