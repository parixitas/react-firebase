import React, { Component } from 'react';
import AuthUserContext from '../auth/AuthUserContext';
import SignOutButton from '../auth/SignOut';
import { SignInWithFacebook } from '../auth/SignIn';
import * as routes from '../../constants/routes';
// import topLogo from '../../assets/LogoDiceFanaticsIcon.png';
import MyNavigation from './MyNavigation';

import {
    NavLink
} from 'reactstrap';


class TopNavigation extends Component {
    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser
                    ? <TopbarNavigationAuth />
                    : <TopbarNavigation />
                }
            </AuthUserContext.Consumer>
        )
    }
}

const TopbarNavigation = () =>
    <nav className="navbar navbar-default navbar-static-top m-b-0">
        <div className="navbar-header">
            <div className="top-left-part no-auth">
                
                <a className="logo" href="index.html">
                    <b>
                        <img src="/static/media/LogoDiceFanaticsIcon.4ad90872.png" alt="home" className="dark-logo" /><img src="/static/media/LogoDiceFanaticsIcon.4ad90872.png" alt="home" className="light-logo" />
                    </b>
                </a>
            </div>
            <ul className="nav navbar-top-links navbar-right pull-right">
                <li className="m-r-12">
                    <SignInWithFacebook />
                </li>
            </ul>
        </div>
    </nav>

const TopbarNavigationAuth = () =>
    <nav className="navbar navbar-default navbar-static-top m-b-0">
        <div className="navbar-header">
            <div className="top-left-part">
                <a className="logo" href="index.html">
                    <b>
                        <img src="/static/media/LogoDiceFanaticsIcon.4ad90872.png" alt="home" className="dark-logo" /><img src="/static/media/LogoDiceFanaticsIcon.4ad90872.png" alt="home" className="light-logo" />
                    </b>
                </a>
            </div>
            <a id="menu-toggle" href="#" className="btn-menu toggle">
                        <i className="fa fa-bars"></i>
                    </a>
            <ul className="nav navbar-top-links navbar-right pull-right" id="signout">
                <li>
                    <NavLink href={routes.HOME}>Home</NavLink>
                </li>
                <li>
                    <NavLink href={routes.ACCOUNT}>Account</NavLink>
                </li>
                <AuthUserContext.Consumer>
                    {authUser =>
                        <MyNavigation uid={authUser.uid} />
                    }
                </AuthUserContext.Consumer>
                {/* <ManageNavigation /> */}
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </div>
    </nav>
export default TopNavigation;