import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    website: '',
    country: '',
    description: '',
    isActive: false,
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddManufacturer extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

        this.toggle = this.toggle.bind(this);
        // var Modal = require('react-bootstrap-modal');
    }

    toggle() {
        this.setState({
            ...INITIAL_STATE,
            modal: !this.state.modal,
        });
        this.props.handleRefresh();
    }

    onSubmit = (e) => {
        e.preventDefault();

//        alert('activated');
        const {
            title,
            website,
            country,
            description,
            isActive,
            error,
        } = this.state;

        db.doCreateManufacturer(
            title,
            website,
            country,
            description,
            isActive,
            error,
        )
        .then(() => {
            this.toggle();
            this.props.handleRefresh();
        })
        .catch(error => {
            alert(error);
        });
    }

    render() {
        const {
            title,
            website,
            country,
            description,
            isActive,
            error,
        } = this.state;

        const isInvalid = title ==='';
        
        return (
            <div>
                <Button type="button" onClick={this.toggle} className="btn btn-info warningbtn pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light pull-right"><i className="fa  fa-plus-circle"></i> Add New Manufacturer</Button>
                <Button type="button" onClick={this.toggle} className="btn btn-info warningbtn pull-right  hidden-lg hidden-md"><i className="fa  fa-plus-circle"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Label for="title" sm={3}>Title</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={title}
                                        onChange={e => this.setState(byPropKey('title', e.target.value))}
                                        type="text" 
                                        placeholder="Title" 
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Website</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={website}
                                        onChange={e => this.setState(byPropKey('website', e.target.value))}
                                        type="text"
                                        placeholder="www.Website.com"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="country" sm={3}>Country</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={country}
                                        onChange={e => this.setState(byPropKey('country', e.target.value))}
                                        type="select" 
                                    >
                                        <option value="">--Select a Country--</option>
                                        <option value="USA">USA</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleText" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <Input
                                        value={description}
                                        onChange={e => this.setState(byPropKey('description', e.target.value))}
                                        type="textarea"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label for="checkbox2" sm={3}>Active?</Label>
                            <Col sm={{ size: 9 }}>
                                <FormGroup check>
                                    <Label check>
                                        <Input 
                                            checked={!!isActive}
                                            onChange={e => this.setState({isActive: e.target.checked})}
                                            type="checkbox"
                                        />{' '}Yes
                                    </Label>
                                </FormGroup>
                            </Col>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <FormGroup>
                                <FormText>
                                    { error && <p>{error.message}</p>}
                                </FormText>
                            </FormGroup>
                            <Button disabled={isInvalid} type="submit" color="success">Save Changes</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default AddManufacturer;