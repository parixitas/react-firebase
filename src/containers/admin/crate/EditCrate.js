import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    uniqueId: null,
    title: '',
    email: '',
    website: '',
    description: '',
    isActive: false,
//---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditCrate extends Component {
    constructor(props) {
        super(props);
        if(this.props.dataRow) {
            this.state = { uniqueId: this.props.dataRow.key, ...this.props.dataRow };
        } else {
            this.state = { ...INITIAL_STATE };
        }        
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
        this.props.handleRefresh();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            uniqueId,
            title,
            email,
            website,
            description,
            isActive,
            error,
        } = this.state;
        console.log('------Submitting Update------');
console.log(this.state);
        db.doUpdateCrate(
            uniqueId,
            title,
            email,
            website,
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
            uniqueId,
            title,
            email,
            website,
            description,
            isActive,
            error,
        } = this.state;

        const isInvalid = uniqueId ==='' || title ==='';

        return (
            <div>
              <Button type="button" onClick={this.toggle}  className="btn btn-warning warningbtn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
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
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={email}
                                        onChange={e => this.setState(byPropKey('email', e.target.value))}
                                        type="text"
                                        placeholder="your@email.com"
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
                                        placeholder="www.Website.com"
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

export default EditCrate;