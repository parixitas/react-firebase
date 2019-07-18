import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button, FormText} from 'reactstrap';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes'

const PasswordForgotPage = () =>
<div>
    <h1>Forgot your Password?</h1>
    <PasswordForgotForm/>
</div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    isFacebookAuthenticated: true,
    error: null,
};

class PasswordForgotForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: this.props.email,
            isFacebookAuthenticated: true,
            error: null
         };
    }
    onSubmit = (e) => {
        const { email } = this.state;
        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        e.preventDefault();
    }

    render() {
        const {
            email,
            isFacebookAuthenticated,
            error,
        } = this.state;

        const isNotAllowed = isFacebookAuthenticated;
        const isInvalid = email === '' || isNotAllowed;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormText>If you have forgotten your password you can enter your email address here and click "Reset my Password" and an email will be sent to you with a link and instructions:</FormText>
                    <Input
                        disabled={isNotAllowed}
                        value={this.state.email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />    
                </FormGroup>
                <FormGroup>
                    <Button disabled={isInvalid} type="submit" block>
                        Reset my Password
                    </Button>
                </FormGroup>
                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

const PasswordForgotLink = () =>
<p>
    <Link to={routes.PASSWORD_FORGOT}>Forgot Password</Link>
</p>

export default PasswordForgotPage;

export {
    PasswordForgotForm,
    PasswordForgotLink,
}