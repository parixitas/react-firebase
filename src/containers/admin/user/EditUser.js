import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    uniqueId: null,
    username: '',
    email: '',
    displayName: '',
    photoURL: '',
//---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditUser extends Component {
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
            username,
            email,
            displayName,
            photoURL,
            error,
        } = this.state;

        db.doUpdateUser(
            uniqueId,
            username,
            email,
            displayName,
            photoURL,
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
            username,
            email,
            displayName,
            photoURL,
            error,
        } = this.state;

        const isInvalid = uniqueId ==='' || username === '' || email ==='';

        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Label for="title" sm={3}>Username</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={username}
                                        onChange={e => this.setState(byPropKey('username', e.target.value))}
                                        type="text" 
                                        placeholder="Username" 
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
                                <Label for="website" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={displayName}
                                        onChange={e => this.setState(byPropKey('displayName', e.target.value))}
                                        type="text"
                                        placeholder="Your Name"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleText" sm={3}>Photo</Label>
                                <Col sm={9}>
                                    <Input
                                        value={photoURL}
                                        onChange={e => this.setState(byPropKey('photoURL', e.target.value))}
                                        type="text"
                                        placeholder="URL for your photo"
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
                            <Button disabled={isInvalid} type="submit" color="primary">Save Changes</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default EditUser;