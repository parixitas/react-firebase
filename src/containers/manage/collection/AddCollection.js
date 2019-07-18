import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    website: '',
    description: '',
    version: '',
    startDate: '',
    tags: '',
    isHandmade: false,
    //-----------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddCollection extends Component {
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
            website,
            description,
            version,
            startDate,
            tags,
            isHandmade,
            //-----------------
            error,
        } = this.state;
        
        db.doCreateCollection(
            title,
            website,
            description,
            version,
            startDate,
            tags,
            isHandmade,
            //-----------------
            this.props.uid,
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
            description,
            version,
            startDate,
            tags,
            isHandmade,
            //-----------------
            error,
        } = this.state;

        const isInvalid = this.props.uid === null || title ==='' ;

        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                            My Collection
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
                                <Label for="website" sm={3}>Website</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={website}
                                        onChange={e => this.setState(byPropKey('website', e.target.value))}
                                        type="text"
                                        placeholder="www.manufacturer.com/product/url"
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
                                <Label for="version" sm={3}>Version</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={version}
                                        onChange={e => this.setState(byPropKey('version', e.target.value))}
                                        type="text"
                                        placeholder="2nd Printing / Version 1.2 / etc."
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="startDate" sm={3}>Start Date</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={startDate}
                                        onChange={e => this.setState(byPropKey('startDate', e.target.value))}
                                        type="date"
                                        name="startDate"
                                        placeholder="Start Date"
                                    />
                                </Col>
                            </FormGroup>                                                        
                            <FormGroup row>
                                <Label for="tags" sm={3}>Tags</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={tags}
                                        onChange={e => this.setState(byPropKey('tags', e.target.value))}
                                        type="text"
                                        placeholder="Dice, Polyhedral, etc."
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="isHandmade" sm={3}>Is Handmade?</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isHandmade}
                                                onChange={e => this.setState({isHandmade: e.target.checked})}
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
                            <Button disabled={isInvalid} type="submit" color="primary">Save Changes</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default AddCollection;