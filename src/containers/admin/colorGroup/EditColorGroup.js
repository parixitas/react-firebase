import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    // pantoneCode: '',
    // rgbCode: '',
    hexCode: '',
//---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditColorGroup extends Component {
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
            // pantoneCode,
            // rgbCode,
            hexCode,
            //-----------------
            error,
        } = this.state;

        db.doUpdateColorGroup(
            uniqueId,
            title,
            // pantoneCode,
            // rgbCode,
            hexCode,
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
            uniqueId,
            title,
            // pantoneCode,
            // rgbCode,
            hexCode,
            //-----------------
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
                            {/* <FormGroup row>
                                <Label for="pantoneCode" sm={3}>Pantone</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={pantoneCode}
                                        onChange={e => this.setState(byPropKey('pantoneCode', e.target.value))}
                                        type="text"
                                        placeholder=""
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rgbCode" sm={3}>RGB</Label>
                                <Col sm={9}>
                                    <Input
                                        value={rgbCode}
                                        onChange={e => this.setState(byPropKey('rgbCode', e.target.value))}
                                        type="textarea"
                                    />
                                </Col>
                            </FormGroup> */}
                            <FormGroup row>
                                <Label for="hexCode" sm={3}>Hex</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={hexCode}
                                        onChange={e => this.setState(byPropKey('hexCode', e.target.value))}
                                        type="color"
                                        placeholder="#ABABAB"
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

export default EditColorGroup;