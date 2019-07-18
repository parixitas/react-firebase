import React, { Component } from 'react';
import { db } from '../../firebase';
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

class MyNavigation extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: true,
            username: null,
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    getUsername(uid) {
        db.getUsername(uid)
            .then(snapshot => {
                const results = snapshot.val().username;
                if(results) {
                    this.setState({ username: results});
                } else {
                    this.setState({ user: null });
                }
            });
    }

    render() {
        return (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        My Collection
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <NavLink href={`/my/${this.state.username}/collection`}>Collections</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href={`/my/${this.state.username}/dicesets`}>Sets</NavLink>
                        </DropdownItem>
                        {/* <DropdownItem>
                            <NavLink href={`/my/${authUser.uid}/singledice`}>Singles</NavLink>
                        </DropdownItem> */}
                    </DropdownMenu>
                </UncontrolledDropdown>

        )}
    }

export default MyNavigation;