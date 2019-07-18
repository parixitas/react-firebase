import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    uniqueId: null,
    title: '',
    description: '',
    version: '',
    faces: 6,
    faceShape: 'Square',
    faceType: 'Regular',
    faceLayout: '',
    dieType: 'd6',
    maxSize: 16,
    pipType: 'Numbered',
    weight: 5.6,
    shape: 'regular cube',   
    setIndex: 6,     
    idSet: '',
//---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditDie extends Component {
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
            version,
            faces,
            faceShape,
            faceType,
            faceLayout,
            dieType,
            maxSize,
            pipType,
            weight,
            shape,   
            setIndex,     
            idSet,
            //-----------------
            error,
        } = this.state;

        db.doUpdateDie(
            uniqueId,
            title,
            description,
            version,
            faces,
            faceShape,
            faceType,
            faceLayout,
            dieType,
            maxSize,
            pipType,
            weight,
            shape,   
            setIndex,     
            idSet,
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
            version,
            faces,
            faceShape,
            faceType,
            faceLayout,
            dieType,
            maxSize,
            pipType,
            weight,
            shape,   
            setIndex,     
            idSet,
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
                                <Label for="faces" sm={3}>Faces</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={faces}
                                        onChange={e => this.setState(byPropKey('faces', e.target.value))}
                                        type="number"
                                        name="faces"
                                        placeholder="6"
                                    />
                                </Col>
                            </FormGroup>                                                        
                            <FormGroup row>
                                <Label for="faceShape" sm={3}>Face Shape</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={faceShape}
                                        onChange={e => this.setState(byPropKey('faceShape', e.target.value))}
                                        type="select" 
                                        name="faceShape"
                                    >
                                        <option></option>
                                        {this.props.faceShapes.map((o) => {
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
                                <Label for="faceType" sm={3}>Face Type</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={faceType}
                                        onChange={e => this.setState(byPropKey('faceType', e.target.value))}
                                        type="select" 
                                        name="faceType"
                                    >
                                        <option></option>
                                        {this.props.faceTypes.map((o) => {
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
                                <Label for="faceLayout" sm={3}>Face Layout</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={faceLayout}
                                        onChange={e => this.setState(byPropKey('faceLayout', e.target.value))}
                                        type="select" 
                                        name="faceLayout"
                                    >
                                        <option></option>
                                        {this.props.faceLayouts.map((o) => {
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
                                <Label for="dieType" sm={3}>Type</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={dieType}
                                        onChange={e => this.setState(byPropKey('dieType', e.target.value))}
                                        type="select" 
                                        name="dieType"
                                    >
                                        <option></option>
                                        {this.props.dieTypes.map((o) => {
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
                                <Label for="weight" sm={3}>Weight (g)</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={weight}
                                        onChange={e => this.setState(byPropKey('weight', e.target.value))}
                                        type="number"
                                        placeholder="5.5"
                                    />
                                </Col>
                            </FormGroup> 
                            <FormGroup row>
                                <Label for="shape" sm={3}>Shape</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={shape}
                                        onChange={e => this.setState(byPropKey('shape', e.target.value))}
                                        type="select" 
                                        name="shape"
                                    >
                                        <option></option>
                                        {this.props.shapes.map((o) => {
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
                                <Label for="setIndex" sm={3}>Index #</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={setIndex}
                                        onChange={e => this.setState(byPropKey('setIndex', e.target.value))}
                                        type="number"
                                        placeholder="6"
                                    />
                                </Col>
                            </FormGroup>                           
                            <FormGroup row>
                                <Label for="idSet" sm={3}>Set</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={idSet}
                                        onChange={e => this.setState(byPropKey('idSet', e.target.value))}
                                        type="select" 
                                        name="idSet"
                                    >
                                        <option></option>
                                        {this.props.sets.map((o) => {
                                            return (
                                                <option key={o.id} value={o.id}>
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

export default EditDie;