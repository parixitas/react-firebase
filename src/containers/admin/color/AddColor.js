import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    colorGroup: '',
    // pantoneCode: '',
    // rgbCode: '',
    hexCode: '',
    //-----------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddColor extends Component {
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
            colorGroup,
            // pantoneCode,
            // rgbCode,
            hexCode,
            //-----------------
            error,
        } = this.state;

        db.doCreateColor(
            title,
            colorGroup,
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
            title,
            colorGroup,
            // pantoneCode,
            // rgbCode,
            hexCode,
            //-----------------
            error,
        } = this.state;

        const isInvalid = title ==='' || colorGroup ==='';

        return (
            <div>
                <Button type="button" onClick={this.toggle} className="btn btn-info warningbtn pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light"><i className="fa  fa-plus-circle"></i> Add New Color</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        
                            <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                            <ModalBody>
                            {/* Color */}
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
                                <Label for="colorGroup" sm={3}>Color Group</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={colorGroup}
                                        onChange={e => this.setState(byPropKey('colorGroup', e.target.value))}
                                        type="select" 
                                        name="colorGroup"
                                    >
                                        <option></option>
                                        {this.props.colorGroups.map((o) => {
                                            return (
                                                <option key={o.id} value={o.title}>
                                                    {o.title}
                                                </option>
                                            )
                                        })}
                                    </Input>
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
                                <Label for="hexCode" sm={3}>Color</Label>
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

export default AddColor;