import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { db } from '../../../firebase';

const INITIAL_STATE = {
    idSet: '',
    idCollection: '',
    title: '',
    description: '',
    purchaseDate: '',
    purchasePrice: 0,
    salePrice: 0,
    tags: '',
    diceOwned: '',
    isMine: true,
    isIncomplete: false,
    isWantToSell: false,
    isWantToBuy: false,
    isUnicorn: false,
    isHandmade: false,
    isAltered: false,
//---------------------
    modal: false,
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class EditDiceSet extends Component {
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
            idSet,
            idCollection,
            title,
            description,
            purchaseDate,
            purchasePrice,
            salePrice,
            tags,
            diceOwned,
            isMine,
            isIncomplete,
            isWantToSell,
            isWantToBuy,
            isUnicorn,
            isHandmade,
            isAltered,
            //-----------------
            error,
        } = this.state;

        db.doUpdateDiceSet(
            uniqueId,
            idSet,
            idCollection,
            title,
            description,
            purchaseDate,
            purchasePrice,
            salePrice,
            tags,
            diceOwned,
            isMine,
            isIncomplete,
            isWantToSell,
            isWantToBuy,
            isUnicorn,
            isHandmade,
            isAltered,
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
    }

    render() {
        const {
            uniqueId,
            idSet,
            idCollection,
            title,
            description,
            purchaseDate,
            purchasePrice,
            salePrice,
            tags,
            diceOwned,
            isMine,
            isIncomplete,
            isWantToSell,
            isWantToBuy,
            isUnicorn,
            isHandmade,
            isAltered,
            //-----------------
            error,
        } = this.state;

        const isInvalid = uniqueId ==='' || title ==='' || idCollection === '';

        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Label for="idSet" sm={3}>Factory Set</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={idSet}
                                        onChange={e => this.setState(byPropKey('idSet', e.target.value))}
                                        type="select" 
                                        name="idSet"
                                    >
                                        <option value="">--</option>
                                        {this.props.sets.map((o) => {
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
                                <Label for="idCollection" sm={3}>My Collection</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={idSet}
                                        onChange={e => this.setState(byPropKey('idCollection', e.target.value))}
                                        type="select" 
                                        name="idCollection"
                                    >
                                        <option></option>
                                        {this.props.collections.map((o) => {
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
                            <FormGroup row>
                                <Label for="diceOwned" sm={3}>Dice Owned</Label>
                                <Col sm={9}>
                                    <Input 
                                        value={diceOwned}
                                        onChange={e => this.setState(byPropKey('diceOwned', e.target.value))}
                                        type="text"
                                        name="diceOwned"
                                        placeholder="YNYYNNN"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="isMine" sm={3}>Have this set?</Label>
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
                                <Label for="isIncomplete" sm={3}>Incomplete?</Label>
                                <Col sm={9}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                checked={!!isIncomplete}
                                                onChange={e => this.setState({isIncomplete: e.target.checked})}
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

export default EditDiceSet;