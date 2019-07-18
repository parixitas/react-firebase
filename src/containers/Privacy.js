import React from 'react';
import {Jumbotron, Media, Container, Row, Col, } from 'reactstrap';


const Privacy = () => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-5">Privacy Policy</h1>
                <p className="lead">We protect your information by not storing it.  Any personal data about you is maintained elsewhere by you and we simply ask for permission to use it when needed (to ship items, etc).  This is why we let you login to our site from Facebook, Google, or other external providers... because we simply don't want to hold a database of your data.  You already have those accounts and you deal with their privacy policies relating to it, so we don't have to.</p>
            </Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <Media>
                            <Media left href="#">
                                <Media object data-src="" alt=""/>
                            </Media>
                            <Media body>
                                <Media heading>Have questions?</Media>
                                <p>During our alpha test we will be adding more terms and conditions to our website but for now we just want you to know that we take privacy seriously.</p>
                                <a href="https://Facebook.com/groups/DiceFanatics">Become a Dice Fanatic</a>
                            </Media>
                        </Media>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Privacy;
