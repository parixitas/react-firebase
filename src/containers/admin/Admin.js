import React, { Component } from 'react';


import AuthUserContext from '../../components/auth/AuthUserContext';
import withAuthorization from '../../components/auth/withAuthorization';

import { Container, Row, Col } from 'reactstrap';
import $ from 'jquery';


class Admin extends Component {
    componentDidMount() {
        $('.sidebar_ul a').each(function (index, value) {
            if ($(this).prop("href") === window.location.href) {
                $(this).addClass('active');
            }
        });

        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("active");

        });
    }


    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    <div>
                        <div id="page-wrapper">
                            <div className="container-fluid">
                                <div className="row bg-title">
                                    <div className="col-12">
                                        <h4 className="page-title">Dashboard</h4> </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="white-box">
                                            <Col>
                                                <h1>Admin Page</h1>
                                                <p>Restricted area to admins only</p>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </AuthUserContext.Consumer>
        );
    }
}
// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Admin);