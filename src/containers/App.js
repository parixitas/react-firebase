import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation';
import TopNavigation from '../components/navigation/TopNavigation';
import Footer from '../components/navigation/Footer';
import LandingPage from './Landing';
import SignUpPage from '../components/auth/SignUp';
import SignInPage from '../components/auth/SignIn';
import PasswordForgotPage from '../components/auth/PasswordForgot';
import HomePage from './Home';
import AccountPage from './account/Account';

import AdminPage from './admin/Admin';
import Manufacturers from './admin/manufacturer/Manufacturers';
import Retailers from './admin/retailer/Retailers';
import Crates from './admin/crate/Crates';
import Users from './admin/user/Users';
import Collections from './admin/collection/Collections';
import ProductLines from './admin/productLine/ProductLines';
import Sets from './admin/set/Sets';
import Dice from './admin/die/Dice';
import DieTypes from './admin/dieType/DieTypes';
import SetTypes from './admin/setType/SetTypes';
import Colors from './admin/color/Colors';
import ColorGroups from './admin/colorGroup/ColorGroups';
import Materials from './admin/material/Materials';
import MaterialTypes from './admin/materialType/MaterialTypes';
import Styles from './admin/style/Styles';
import StyleTypes from './admin/styleType/StyleTypes';
import Shapes from './admin/shape/Shapes';
import UnitOfMeasures from './admin/unitOfMeasure/UnitOfMeasures';

import MyCollection from './my/collection/Collection';
import MyDiceSets from './my/collection/ShowDiceSets';
// import MySingleDie from './my/singledie/Dice';

import ManageCollections from './manage/collection/Collections';
import ManageDiceSets from './manage/diceSet/DiceSets';
import ManageSingleDice from './manage/singleDie/SingleDice';

import * as routes from '../constants/routes';
import withAuthentication from '../components/auth/withAuthentication';
import {  Row, Col, } from 'reactstrap';

import Privacy from './Privacy';

const App = () =>
    <Router>
        <div id="wrapper">
            <TopNavigation />
            <Navigation />
            {/* <div id="page-wrapper">
                <div className="container-fluid"> */}
                    {/* <Container style={{ width: 'auto' }}> */}
                        <Row>
                            <Col>
                                <Route exact path={routes.LANDING} component={LandingPage} />
                                <Route exact path={routes.SIGN_UP} component={SignUpPage} />
                                <Route exact path={routes.SIGN_IN} component={SignInPage} />
                                <Route exact path={routes.PASSWORD_FORGOT} component={PasswordForgotPage} />
                                <Route exact path={routes.HOME} component={HomePage} />
                                <Route exact path={routes.ACCOUNT} component={AccountPage} />
                                <Route exact path={routes.ADMIN} component={AdminPage} />
                                <Route exact path={routes.ADMINMANUFACTURERS} component={Manufacturers} />
                                <Route exact path={routes.ADMINRETAILERS} component={Retailers} />
                                <Route exact path={routes.ADMINCRATES} component={Crates} />
                                <Route exact path={routes.ADMINUSERS} component={Users} />
                                <Route exact path={routes.ADMINCOLLECTIONS} component={Collections} />
                                <Route exact path={routes.ADMINPRODUCTLINES} component={ProductLines} />
                                <Route exact path={routes.ADMINSETS} component={Sets} />
                                <Route exact path={routes.ADMINDICE} component={Dice} />
                                <Route exact path={routes.ADMINDIETYPES} component={DieTypes} />
                                <Route exact path={routes.ADMINSETTYPES} component={SetTypes} />
                                <Route exact path={routes.ADMINCOLORS} component={Colors} />
                                <Route exact path={routes.ADMINMATERIALS} component={Materials} />
                                <Route exact path={routes.ADMINMATERIALTYPES} component={MaterialTypes} />
                                <Route exact path={routes.ADMINSTYLES} component={Styles} />
                                <Route exact path={routes.ADMINSTYLETYPES} component={StyleTypes} />
                                <Route exact path={routes.ADMINSHAPES} component={Shapes} />
                                <Route exact path={routes.ADMINCOLORGROUPS} component={ColorGroups} />
                                <Route exact path={routes.ADMINUNITOFMEASURES} component={UnitOfMeasures} />

                                <Route exact path={`/my/:username/collection`} component={MyCollection} />
                                <Route exact path={`/my/:username/dicesets`} component={MyDiceSets} />
                                {/* <Route exact path={`/my/:username/dice`} component={MyDie}/> */}

                                <Route exact path={routes.MANAGECOLLECTIONS} component={ManageCollections} />
                                <Route exact path={routes.MANAGEDICESETS} component={ManageDiceSets} />
                                <Route exact path={routes.MANAGESINGLEDICE} component={ManageSingleDice} />

                                <Route exact path={routes.PRIVACY} component={Privacy} />
                            </Col>
                        </Row>
                    {/* </Container> */}
                {/* </div>
            </div> */}
            <Footer />
        </div>
    </Router>


export default withAuthentication(App);