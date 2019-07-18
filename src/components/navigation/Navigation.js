import React, { Component } from 'react';
import AuthUserContext from '../auth/AuthUserContext';
import * as routes from '../../constants/routes';
// import $ from 'jquery';

class Navigation extends Component {


    // componentWillMount() {
    //     $('.sidebar_ul a').each(function (index, value) {
    //         if ($(this).prop("href") === window.location.href) {
    //                     $(this).addClass('active');
    //                 }
    //     });
    // }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser
                    ? <NavigationAuth />
                    : <NavigationNonAuth />
                }
            </AuthUserContext.Consumer>
        )
    }
}

const NavigationAuth = () =>
    <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav slimscrollsidebar" id="sidebar-wrapper">

            <nav id="spy">
                <ul className="nav sidebar_ul sidebar-nav" id="side-menu">
                        <a className="logo hidden-lg hidden-md" href="index.html">
                            <b>
                                <img src="/static/media/LogoDiceFanaticsIcon.4ad90872.png" alt="home" className="dark-logo" />
                            </b>
                        </a>
                    <li className="first_li">
                        <a href={routes.ADMIN} className="waves-effect"><i className="fa fa-dashboard fa-fw" aria-hidden="true"></i>Dashboard</a>
                    </li>
                    <li>
                        <a href={routes.ADMINMANUFACTURERS} className="waves-effect"><i className="fa fa-users fa-fw" aria-hidden="true"></i>Manufacturers</a>
                    </li>
                    <li>
                        <a href={routes.ADMINRETAILERS} className="waves-effect"><i className="fa fa-registered fa-fw" aria-hidden="true"></i>Retailers</a>
                    </li>
                    <li>
                        <a href={routes.ADMINCRATES} className="waves-effect"><i className="fa fa-hashtag fa-fw" aria-hidden="true"></i>Crates</a>
                    </li>
                    <li>
                        <a href={routes.ADMINPRODUCTLINES} className="waves-effect"><i className="fa fa-link fa-fw" aria-hidden="true"></i>Product Lines</a>
                    </li>
                    <li>
                        <a href={routes.ADMINSETS} className="waves-effect"><i className="fa fa-th-large fa-fw" aria-hidden="true"></i>Sets</a>
                    </li>
                    <li>
                        <a href={routes.ADMINDICE} className="waves-effect"><i className="fa fa-cubes fa-fw" aria-hidden="true"></i>Dice</a>
                    </li>
                    <li>
                        <a href={routes.ADMINDIETYPES} className="waves-effect"><i className="fa fa-dashcube  fa-fw" aria-hidden="true"></i>Die Types</a>
                    </li>
                    <li>
                        <a href={routes.ADMINSETTYPES} className="waves-effect"><i className="fa fa-th-list fa-fw" aria-hidden="true"></i>Set Types</a>
                    </li>
                    <li>
                        <a href={routes.ADMINCOLORS} className="waves-effect"><i className="fa fa-snowflake-o fa-fw" aria-hidden="true"></i>Colors</a>
                    </li>
                    <li>
                        <a href={routes.ADMINCOLORGROUPS} className="waves-effect"><i className="fa fa-empire fa-fw" aria-hidden="true"></i>Color Groups</a>
                    </li>
                    <li>
                        <a href={routes.ADMINMATERIALS} className="waves-effect"><i className="fa fa-tasks fa-fw" aria-hidden="true"></i>Materials</a>
                    </li>
                    <li>
                        <a href={routes.ADMINMATERIALTYPES} className="waves-effect"><i className="fa fa-random fa-fw" aria-hidden="true"></i>Material Types</a>
                    </li>
                    <li>
                        <a href={routes.ADMINSTYLES} className="waves-effect"><i className="fa fa-star-o fa-fw" aria-hidden="true"></i>Styles</a>
                    </li>
                    <li>
                        <a href={routes.ADMINSTYLETYPES} className="waves-effect"><i className="fa fa-star-half-o fa-fw" aria-hidden="true"></i>Style Types</a>
                    </li>
                    <li>
                        <a href={routes.ADMINSHAPES} className="waves-effect"><i className="fa fa-codepen fa-fw" aria-hidden="true"></i>Shapes</a>
                    </li>
                    <li>
                        <a href={routes.ADMINUNITOFMEASURES} className="waves-effect"><i className="fa fa-shield fa-fw" aria-hidden="true"></i>Units of Measurement</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
const NavigationNonAuth = () =>
    <div className="navbar-default sidebar none-display" role="navigation">
        <div className="sidebar-nav slimscrollsidebar">
            <ul className="none-display">
            </ul>
        </div>
    </div>
export default Navigation;