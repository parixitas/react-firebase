import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    description: '',
    sides: 6,
    type: 'Platonic Solid',
    geometry: 'Regular',
    patentURL: '',
    //-----------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddShape extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...INITIAL_STATE,
        };
        this.toggle = this.toggle.bind(this);
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

        const {
            title,
            description,
            sides,
            type,
            geometry,
            patentURL,
            //-----------------
            error,
        } = this.state;

        db.doCreateShape(
            title,
            description,
            sides,
            type,
            geometry,
            patentURL,
            //-----------------
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
            description,
            sides,
            type,
            geometry,
            patentURL,
            //-----------------
            error,
        } = this.state;

        const isInvalid = 
            title ==='' || 
            sides < 1 || 
            type === '';

        return (
            <div>
                <Button type="button" onClick={this.toggle} className="btn btn-info warningbtn pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light"><i className="fa  fa-plus-circle"></i> Add New Shape</Button>
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
                                <Label for="version" sm={3}>Sides</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={sides}
                                        onChange={e => this.setState(byPropKey('sides', e.target.value))}
                                        type="number"
                                        placeholder='Enter the number of sides'
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="type" sm={3}>Type</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={type}
                                        onChange={e => this.setState(byPropKey('type', e.target.value))}
                                        type="select" 
                                        name="type"
                                    >
                                        <option></option>
                                        {this.props.types.map((o) => {
                                            return (
                                                <option key={o.id} value={o.title}>
                                                    {o.title}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="type" sm={3}>Geometry</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={geometry}
                                        onChange={e => this.setState(byPropKey('geometry', e.target.value))}
                                        type="select" 
                                        name="geometry"
                                    >
                                        <option></option>
                                        {this.props.geometries.map((o) => {
                                            return (
                                                <option key={o.id} value={o.title}>
                                                    {o.title}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="patentURL" sm={3}>Patent URL</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={patentURL}
                                        onChange={e => this.setState(byPropKey('patentURL', e.target.value))}
                                        type="text"
                                        placeholder="www.uspto.gov/patent/url"
                                    />
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

export default AddShape;