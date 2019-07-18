import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ShowDiceSets from './ShowDiceSets';

const MyCollection = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>test
                        <ShowDiceSets collectionId="" baseObject="Collections"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
//const authCondition = (authUser) => !!authUser;
const authCondition = true; // this is a public page

export default withAuthorization(authCondition)(MyCollection);