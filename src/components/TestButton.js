import React, { Component } from 'react';
import { db } from '../firebase';
import { Button } from 'reactstrap';
class TestButton extends Component {

    
    onClick = (e) => {
        db.doCreateCollection("sample", "sample")
            .then(() => {
                alert("completed");
            })
            .catch(error => {
                alert(error);
            });
        e.preventDefault();
    }

    render () {
        return (
            <Button color={this.props.color} className="float-right" onClick={this.onClick}>Button</Button>
        )
    }
}
    
export default TestButton;