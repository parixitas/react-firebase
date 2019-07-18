import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    uniqueId: null,
    title: '',
    manufacturer: '',
    website: '',
    description: '',
    version: '',
    productionDate: '',
    colorCount: 1,
    primaryStyle: '',
    primaryMaterial: '',
    primaryColor: '',
    isOutOfPrint: false,
    isHandmade: false,
    //---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditProductLine extends Component {
    constructor(props) {
        super(props);
        if (this.props.dataRow) {
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
            manufacturer,
            website,
            description,
            version,
            productionDate,
            colorCount,
            primaryStyle,
            primaryMaterial,
            primaryColor,
            isOutOfPrint,
            isHandmade,
            //-----------------
            error,
        } = this.state;

        db.doUpdateProductLine(
            uniqueId,
            title,
            manufacturer,
            website,
            description,
            version,
            productionDate,
            colorCount,
            primaryStyle,
            primaryMaterial,
            primaryColor,
            isOutOfPrint,
            isHandmade,
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
            manufacturer,
            website,
            description,
            version,
            productionDate,
            colorCount,
            primaryStyle,
            primaryMaterial,
            primaryColor,
            isOutOfPrint,
            isHandmade,
            //-----------------
            error,
        } = this.state;

        const isInvalid = uniqueId === '' || title === '';

        return (
            <div>
                <Button type="button" onClick={this.toggle} className="btn btn-warning warningbtn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                {/* <div className="productline_modal"> */}
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
                                    <Label for="primaryStyle" sm={3}>Manufacturer</Label>
                                    <Col sm={9}>
                                        <Input
                                            value={manufacturer}
                                            onChange={e => this.setState(byPropKey('manufacturer', e.target.value))}
                                            type="select"
                                            name="manufacturer"
                                        >
                                            <option></option>
                                            {this.props.manufacturers.map((o) => {
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
                                    <Label for="website" sm={3}>Product URL</Label>
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
                                    <Label for="productionDate" sm={3}>Production Date</Label>
                                    <Col sm={9}>
                                        <Input
                                            value={productionDate}
                                            onChange={e => this.setState(byPropKey('productionDate', e.target.value))}
                                            type="date"
                                            name="productionDate"
                                            placeholder="Production Date"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="ColorCount" sm={3}># Colors</Label>
                                    <Col sm={9}>
                                        <Input
                                            value={colorCount}
                                            onChange={e => this.setState(byPropKey('colorCount', e.target.value))}
                                            type="number"
                                            placeholder="1"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="isOutOfPrint" sm={3}>Is OOP?</Label>
                                    <Col sm={9}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    checked={!!isOutOfPrint}
                                                    onChange={e => this.setState({ isOutOfPrint: e.target.checked })}
                                                    type="checkbox"
                                                />{' '}Yes
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="isHandmade" sm={3}>Is Handmade?</Label>
                                    <Col sm={9}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    checked={!!isHandmade}
                                                    onChange={e => this.setState({ isHandmade: e.target.checked })}
                                                    type="checkbox"
                                                />{' '}Yes
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="primaryStyle" sm={3}>Primary Style</Label>
                                    <Col sm={9}>
                                        <Input
                                            value={primaryStyle}
                                            onChange={e => this.setState(byPropKey('primaryStyle', e.target.value))}
                                            type="select"
                                            name="primaryStyle"
                                        >
                                            <option></option>
                                            {this.props.styles.map((o) => {
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
                                    <Label for="primaryMaterial" sm={3}>Primary Material</Label>
                                    <Col sm={9}>
                                        <Input
                                            value={primaryMaterial}
                                            onChange={e => this.setState(byPropKey('primaryMaterial', e.target.value))}
                                            type="select"
                                            name="primaryMaterial"
                                        >
                                            <option></option>
                                            {this.props.materials.map((o) => {
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
                                    <Label for="primaryColor" sm={3}>Primary Color</Label>
                                    <Col sm={9}>
                                        <Input
                                            value={primaryColor}
                                            onChange={e => this.setState(byPropKey('primaryColor', e.target.value))}
                                            type="select"
                                            name="primaryColor"
                                        >
                                            <option></option>
                                            {this.props.colors.map((o) => {
                                                return (
                                                    <option key={o.id} value={o.title}>
                                                        {o.title}
                                                    </option>
                                                )
                                            })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <FormGroup>
                                    <FormText>
                                        {error && <p>{error.message}</p>}
                                    </FormText>
                                </FormGroup>
                                <Button disabled={isInvalid} type="submit" color="success">Save Changes</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                {/* </div> */}
            </div>
        )
    }
}

export default EditProductLine;