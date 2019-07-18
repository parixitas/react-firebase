import React, { Component } from 'react';
import { auth } from '../../firebase';
import { Form, FormGroup, Input, Button, FormText } from 'reactstrap';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    isFacebookAuthenticated: true,
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const { passwordOne } = this.state;

        auth.doPasswordUpdate(passwordOne)
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
            passwordOne,
            passwordTwo,
            isFacebookAuthenticated,
            error,
        } = this.state;

        const isInvalid = 
        passwordOne !== passwordTwo ||
        passwordOne === '' ;

        const isNotAllowed = 
        isFacebookAuthenticated;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormText>
                        If you would like to update your password and you did not use a social media login (like Facebook or Google), you can change your password here:
                    </FormText>
                    <Input 
                        disabled={isNotAllowed}
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                        placeholder="New Password"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        disabled={isNotAllowed}
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="Confirm New Password"
                    />
                </FormGroup>
                <FormGroup>
                    <Button disabled={isInvalid} type="submit" block>
                        Change My Password
                    </Button>
                </FormGroup>
                { error && <p>{error.message}</p>}
            </Form>
        )
    }
}

export default PasswordChangeForm;


