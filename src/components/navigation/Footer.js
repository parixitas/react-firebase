import { Component } from 'react';
// import $ from 'jquery';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: true,
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

   

    render() {
        return (
            ''
        )
    }
}

export default Footer;