import React from 'react';
import { auth } from '../../firebase';
import AuthUserContext from './AuthUserContext';
import { Button } from 'reactstrap';

const SignOutButton = () => {
    return (
        <AuthUserContext.Consumer>
            { authUser => authUser 
                ? <Button type="button" onClick={auth.doSignOut}>Sign Out <i className="fa fa-sign-out"></i></Button>
                : ''}
        </AuthUserContext.Consumer>
    )
}
export default SignOutButton;
