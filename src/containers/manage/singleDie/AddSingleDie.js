import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    idDie: '', 
    idDiceSet: '',
    quantity: 0,
    dieType: '',
    isMine: true,
    isWantToSell: false,
    isWantToBuy: false,
    isUnicorn: false,
    isHandmade: false,
    isAltered: false,
    maxSize: 16,
    weight: 5.5,
    setIndex: 6,
    description: '',
    purchaseDate: '',
    purchasePrice: 0,
    salePrice: 99,
    tags: '',

    //-----------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class AddSingleDie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...INITIAL_STATE, 
            idProductLine: this.props.idProductLine, 
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
        const {
            idDie, 
            idDiceSet,
            quantity,
            dieType,
            isMine,
            isWantToSell,
            isWantToBuy,
            isUnicorn,
            isHandmade,
            isAltered,
            maxSize,
            weight,
            setIndex,     
            description,
            purchaseDate,
            purchasePrice,
            salePrice,
            tags,
            //-----------------
            error,
        } = this.state;

        db.doCreateSingleDie(
            idDie, 
            idDiceSet,
            quantity,
            dieType,
            isMine,
            isWantToSell,
            isWantToBuy,
            isUnicorn,
            isHandmade,
            isAltered,
            maxSize,
            weight,
            setIndex,     
            description,
            purchaseDate,
            purchasePrice,
            salePrice,
            tags,
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
        e.preventDefault();
    }

    render() {
        const {
            idDie, 
            idDiceSet,
            quantity,
            dieType,
            isMine,
            isWantToSell,
            isWantToBuy,
            isUnicorn,
            isHandmade,
            isAltered,
            maxSize,
            weight,
            setIndex,     
            description,
            purchaseDate,
            purchasePrice,
            salePrice,
            tags,
            //-----------------
            error,
        } = this.state;

        const isInvalid = idDie ==='' || dieType === '' ;

        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Label for="idSet" sm={3}>Factory Die</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={idDie}
                                        onChange={e => this.setState(byPropKey('idDie', e.target.value))}
                                        type="select" 
                                        name="idDie"
                                    >
                                        <option></option>
                                        {this.props.dice.map((o) => {
                                            return (
                                                <option key={o.id} value={o.id}>
                                                    {o.title}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup> 
                            <FormGroup row>
                                <Label for="idDiceSet" sm={3}>My Set</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={idDiceSet}
                                        onChange={e => this.setState(byPropKey('idDiceSet', e.target.value))}
                                        type="select" 
                                        name="idDiceSet"
                                    >
                                        <option></option>
                                        {this.props.diceSets.map((o) => {
                                            return (
                                                <option key={o.id} value={o.id}>
                                                    {o.title}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup> 
                            <FormGroup row> 
                                <Label for="quantity" sm={3}>Quantity</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={quantity}
                                        onChange={e => this.setState(byPropKey('quantity', e.target.value))}
                                        type="number" 
                                        placeholder="0" 
                                    />
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
                                <Label for="isMine" sm={3}>Own it?</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isMine}
                                                onChange={e => this.setState({isMine: e.target.checked})}
                                                type="checkbox"
                                            />{' '}Yes
                                        </Label>
                                    </FormGroup>
                                </Col>  
                            </FormGroup>   
                            <FormGroup row>
                                <Label for="isWantToSell" sm={3}>Want to sell?</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isWantToSell}
                                                onChange={e => this.setState({isWantToSell: e.target.checked})}
                                                type="checkbox"
                                            />{' '}Yes
                                        </Label>
                                    </FormGroup>
                                </Col>  
                            </FormGroup>  
                            <FormGroup row>
                                <Label for="isWantToBuy" sm={3}>In search of? (ISO)</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isWantToBuy}
                                                onChange={e => this.setState({isWantToBuy: e.target.checked})}
                                                type="checkbox"
                                            />{' '}Yes
                                        </Label>
                                    </FormGroup>
                                </Col>  
                            </FormGroup>  
                            <FormGroup row>
                                <Label for="isUnicorn" sm={3}>Unicorn?</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isUnicorn}
                                                onChange={e => this.setState({isUnicorn: e.target.checked})}
                                                type="checkbox"
                                            />{' '}Yes
                                        </Label>
                                    </FormGroup>
                                </Col>  
                            </FormGroup>  
                            <FormGroup row>
                                <Label for="isHandmade" sm={3}>Handmade?</Label>
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
                            <FormGroup row>
                                <Label for="isAltered" sm={3}>Altered?</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isAltered}
                                                onChange={e => this.setState({isAltered: e.target.checked})}
                                                type="checkbox"
                                            />{' '}Yes
                                        </Label>
                                    </FormGroup>
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
                                <Label for="version" sm={3}>Purchase Date</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={purchaseDate}
                                        onChange={e => this.setState(byPropKey('purchaseDate', e.target.value))}
                                        type="date"
                                        name="purchaseDate"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="version" sm={3}>Purchase Price</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={purchasePrice}
                                        onChange={e => this.setState(byPropKey('purchasePrice', e.target.value))}
                                        type="number"
                                        name="purchasePrice"
                                        placeholder="$9.99"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="salePrice" sm={3}>Sale Price</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={salePrice}
                                        onChange={e => this.setState(byPropKey('salePrice', e.target.value))}
                                        type="number"
                                        name="salePrice"
                                        placeholder="$20.00"
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

export default AddSingleDie;