import React, { Component } from 'react';
import {
    // Navbar,
    // NavbarBrand,
    // Nav,
    // NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

class ManageNavigation extends Component {
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
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Manage
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavLink href={`/manage/collections`}>My Collections</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink href={`/manage/dicesets`}>My Dice Sets</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink href={`/manage/singledice`}>My Singles</NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )}
    }

export default ManageNavigation;