import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    description: '',
    creationStory: '',
    methodOfFabrication: '',
    isActive: 0,
    //-----------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddMaterialType extends Component {
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
            creationStory,
            methodOfFabrication,
            isActive,
            //-----------------
            error,
        } = this.state;

        db.doCreateMaterialType(
            title,
            description,
            creationStory,
            methodOfFabrication,
            isActive,
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
            creationStory,
            methodOfFabrication,
            isActive,
            //-----------------
            error,
        } = this.state;

        const isInvalid = title ==='' ;

        return (
            <div>
                <Button type="button" onClick={this.toggle} className="btn btn-info warningbtn pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light"><i className="fa  fa-plus-circle"></i> Add New Material Type</Button>
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
                                <Label for="creationStory" sm={3}>Creation Story</Label>
                                <Col sm={9}>
                                    <Input
                                        value={creationStory}
                                        onChange={e => this.setState(byPropKey('creationStory', e.target.value))}
                                        type="textarea"
                                    />
                                </Col>
                            </FormGroup> 
                            <FormGroup row>
                                <Label for="methodOfFabrication" sm={3}>Fabrication</Label>
                                <Col sm={9}>
                                    <Input
                                        value={methodOfFabrication}
                                        onChange={e => this.setState(byPropKey('methodOfFabrication', e.target.value))}
                                        type="textarea"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="isActive" sm={3}>Is Active?</Label>
                                <Col sm={9}>
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

export default AddMaterialType;