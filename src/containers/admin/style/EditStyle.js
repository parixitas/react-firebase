import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    uniqueId: null,
    title: '',
    description: '',
    styleType: '',
    originalManufacturer: '',
    colorCount: 1,
    isActive: false,
//---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditStyle extends Component {
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
            description,
            styleType,
            originalManufacturer,
            colorCount,
            isActive,
            //-----------------
            error,
        } = this.state;

        db.doUpdateStyle(
            uniqueId,
            title,
            description,
            styleType,
            originalManufacturer,
            colorCount,
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
            uniqueId,
            title,
            description,
            styleType,
            originalManufacturer,
            colorCount,
            isActive,
            //-----------------
            error,
        } = this.state;

        const isInvalid = uniqueId ==='' || title ==='' || styleType ==='' || colorCount < 1;

        return (
            <div>
               <Button type="button" onClick={this.toggle}  className="btn btn-warning warningbtn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                <Modal id="productline_modal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
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
                                <Label for="styleType" sm={3}>Type</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={styleType}
                                        onChange={e => this.setState(byPropKey('styleType', e.target.value))}
                                        type="select" 
                                        name="styleType"
                                    >
                                            <option></option>
                                            {this.props.styleTypes.map((o) => {
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
                                <Label for="primaryStyle" sm={3}>Original Manufacturer</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={originalManufacturer}
                                        onChange={e => this.setState(byPropKey('originalManufacturer', e.target.value))}
                                        type="select" 
                                        name="originalManufacturer"
                                    >
                                            <option></option>
                                            {this.props.originalManufacturers.map((o) => {
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
                                <Label for="version" sm={3}>Color Count</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={colorCount}
                                        onChange={e => this.setState(byPropKey('colorCount', e.target.value))}
                                        type="number"
                                        placeholder="Enter the # of colors"
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

export default EditStyle;