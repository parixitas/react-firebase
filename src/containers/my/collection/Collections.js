import React from 'react';

import AuthUserContext from '../../../components/auth/AuthUserContext';
import withAuthorization from '../../../components/auth/withAuthorization';

import { Row, Col } from 'reactstrap';
import ShowDiceSets from './ShowDiceSets';

const Collections = () =>
    <AuthUserContext.Consumer>
        {authUser =>
                <Row>
                    <Col>
                        <ShowDiceSets collectionId="" baseObject="Collections"/>   
                    </Col>
                </Row>
        }
    </AuthUserContext.Consumer>

// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
//const authCondition = (authUser) => !!authUser;
const authCondition = true; //This is public

export default withAuthorization(authCondition)(Collections);