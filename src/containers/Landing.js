import React from 'react';
import {Jumbotron, Button, Media, Container, Row, Col, Card, CardTitle, CardSubtitle, CardText, CardImg, CardBody} from 'reactstrap';
import TestButton from '../components/TestButton';
import { SignupWithFacebook } from '../components/auth/SignUp';
import topLogo from '../assets/LogoDiceFanaticsIcon.png';

const Landing = () => {
    return (
        <Container style={{ width: 'auto' }}>
        <div>
            <Jumbotron>
                <h1 className="display-5">Dice Fanatics<img src={topLogo} className="float-left" style={{paddingRight: 15}} alt="What is Dice Fanatics?"/></h1>
                <p className="lead" style={{textAlign: 'justify'}}>Knowing what dice you have, and what dice you are missing is part of the adventure of collecting.  You can use this app to track your collect, set your In Search Of (ISO) dice and maybe even find that impossible "unicorn" that you couldn't find before.</p>
                <hr className="my-2"/>
                <p className="lead">
                    <SignupWithFacebook isBlock={false} size={30} color={'primary'} className={'float-right'}/>
                </p>
            </Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <Media>
                            <Media left href="#">
                                <Media object data-src="" alt=""/>
                            </Media>
                            <Media body>
                                <Media heading >Taking Beta Testers Now</Media>
                                <p style={{textAlign: 'justify'}}>We know you have choices for how you organize your dice.  We would like to grow this tool to become precisely what you wished you had in a dice collection app so please send us suggestions by joining our Dice Fanatics Fan Club on Facebook.</p>
                                <a href="https://Facebook.com/groups/DiceFanatics">Become a Dice Fanatic</a>
                            </Media>
                        </Media>
                    </Col>
                    <Col>
                        <Media>
                            <Media left href="#">
                                <Media object data-src="" alt=""/>
                            </Media>
                            <Media body>
                                <Card>
                                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button color="primary" className="float-right" onClick={this.onClick}>Button</Button>
                                    </CardBody>
                                </Card>
                                <hr/>
                                <Card>
                                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <TestButton color="primary"/>
                                    </CardBody>
                                </Card>
                            </Media>
                        </Media>
                    </Col>
                </Row>
            </Container>
        </div>
         </Container>
    )
}

export default Landing;
