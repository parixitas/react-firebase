import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    title: '',
    manufacturerSKU: '',
    website: '',
    description: '',
    version: '',
    productionDate: '',
    dieCount: 7,
    setType: '',
    setStyle: '',
    material: '',
    color1: '',
    color2: '',
    color3: '',
    color4: '',
    color5: '',
    pipType: '',
    pipColor: '',
    pipFont: '',
    maxSize: '16',
    unitOfMeasure: 'mm',
    isActive: true,
    idProductLine: null,


    //-----------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddSet extends Component {
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
            manufacturerSKU,
            website,
            description,
            version,
            productionDate,
            dieCount,
            setType,
            setStyle,
            material,
            color1,
            color2,
            color3,
            color4,
            color5,
            pipType,
            pipColor,
            pipFont,
            maxSize,
            unitOfMeasure,
            isActive,        
            idProductLine,
            //-----------------
            error,
        } = this.state;

        db.doCreateSet(
            title,
            manufacturerSKU,
            website,
            description,
            version,
            productionDate,
            dieCount,
            setType,
            setStyle,
            material,
            color1,
            color2,
            color3,
            color4,
            color5,
            pipType,
            pipColor,
            pipFont,
            maxSize,
            unitOfMeasure,
            isActive,        
            idProductLine,
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
            manufacturerSKU,
            website,
            description,
            version,
            productionDate,
            dieCount,
            setType,
            setStyle,
            material,
            color1,
            color2,
            color3,
            color4,
            color5,
            pipType,
            pipColor,
            pipFont,
            maxSize,
            unitOfMeasure,
            isActive,        
            idProductLine,
            //-----------------
            error,
        } = this.state;

        const isInvalid = title ==='';

        return (
            <div>
                <Button type="button" onClick={this.toggle} className="btn btn-info warningbtn pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light"><i className="fa  fa-plus-circle"></i> Add New Set</Button>
                <Modal id="set_model" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                        <ModalBody>
                            <div className="row">
                            <Col sm={6}>
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
                                <Label for="manufacturerSKU" sm={3}>SKU</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={manufacturerSKU}
                                        onChange={e => this.setState(byPropKey('manufacturerSKU', e.target.value))}
                                        type="text"
                                        placeholder="CHX-0000"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="website" sm={3}>Set URL</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={website}
                                        onChange={e => this.setState(byPropKey('website', e.target.value))}
                                        type="text"
                                        placeholder="www.manufacturer.com/product/sku"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={3}>Description</Label>
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
                                <Label for="dieCount" sm={3}>Die Count</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={dieCount}
                                        onChange={e => this.setState(byPropKey('dieCount', e.target.value))}
                                        type="number"
                                        placeholder="1"
                                    />
                                </Col>
                            </FormGroup> 
                            <FormGroup row>
                                <Label for="setType" sm={3}>Set Type</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={setType}
                                        onChange={e => this.setState(byPropKey('setType', e.target.value))}
                                        type="select" 
                                        name="setType"
                                    >
                                        <option></option>
                                        {this.props.setTypes.map((o) => {
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
                                <Label for="setStyle" sm={3}>Set Style</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={setStyle}
                                        onChange={e => this.setState(byPropKey('setStyle', e.target.value))}
                                        type="select" 
                                        name="setStyle"
                                    >
                                        <option></option>
                                        {this.props.setStyles.map((o) => {
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
                                <Label for="material" sm={3}>Material</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={material}
                                        onChange={e => this.setState(byPropKey('material', e.target.value))}
                                        type="select" 
                                        name="material"
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
                            
                            
                            </Col>
                            <Col sm={6}>
                            <FormGroup row>
                                <Label for="color1" sm={3}>Color</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={color1}
                                        onChange={e => this.setState(byPropKey('color1', e.target.value))}
                                        type="select" 
                                        name="color1"
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
                            <FormGroup row>
                                <Label for="color2" sm={3}>Color</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={color2}
                                        onChange={e => this.setState(byPropKey('color2', e.target.value))}
                                        type="select" 
                                        name="color2"
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
                            <FormGroup row>
                                <Label for="color3" sm={3}>Color</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={color3}
                                        onChange={e => this.setState(byPropKey('color3', e.target.value))}
                                        type="select" 
                                        name="color3"
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
                            <FormGroup row>
                                <Label for="color4" sm={3}>Color</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={color4}
                                        onChange={e => this.setState(byPropKey('color4', e.target.value))}
                                        type="select" 
                                        name="color4"
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
                            <FormGroup row>
                                <Label for="color5" sm={3}>Color</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={color5}
                                        onChange={e => this.setState(byPropKey('color5', e.target.value))}
                                        type="select" 
                                        name="color5"
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
                            <FormGroup row>
                                <Label for="pipType" sm={3}>Pip Type</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={pipType}
                                        onChange={e => this.setState(byPropKey('pipType', e.target.value))}
                                        type="select" 
                                        name="pipType"
                                    >
                                        <option></option>
                                        {this.props.pipTypes.map((o) => {
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
                                <Label for="pipColor" sm={3}>Pip Color</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={pipColor}
                                        onChange={e => this.setState(byPropKey('pipColor', e.target.value))}
                                        type="select" 
                                        name="pipColor"
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
                            <FormGroup row>
                                <Label for="pipFont" sm={3}>Pip Font</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={pipFont}
                                        onChange={e => this.setState(byPropKey('pipFont', e.target.value))}
                                        type="select" 
                                        name="pipFont"
                                    >
                                        <option></option>
                                        {this.props.fonts.map((o) => {
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
                                <Label for="maxSize" sm={3}>Max Size</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={maxSize}
                                        onChange={e => this.setState(byPropKey('maxSize', e.target.value))}
                                        type="number"
                                        // placeholder="16"
                                    />
                                </Col>
                            </FormGroup> 
                            <FormGroup row>
                                <Label for="unitOfMeasure" sm={3}>UOM</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={unitOfMeasure}
                                        onChange={e => this.setState(byPropKey('unitOfMeasure', e.target.value))}
                                        type="select" 
                                        name="unitOfMeasure"
                                    >
                                        <option></option>
                                        {this.props.unitOfMeasures.map((o) => {
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
                            <FormGroup row>
                                <Label for="idProductLine" sm={3}>Product Line</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={idProductLine}
                                        onChange={e => this.setState(byPropKey('idProductLine', e.target.value))}
                                        type="select" 
                                        name="idProductLine"
                                    >
                                        <option></option>
                                        {this.props.productLines.map((o) => {
                                            return (
                                                <option key={o.id} value={o.id}>
                                                    {o.title}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>  
                            </Col>
                                </div>
                        
                                               
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

export default AddSet;