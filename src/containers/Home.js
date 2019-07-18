import React, { Component } from 'react';
import withAuthorization from '../components/auth/withAuthorization';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>The home page</p>
            </div>
        )
    }
}

// const UserList = ({ users }) =>
// <div>
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase DB)</p>

//     {Object.keys(users).map(key => 
//         // <div key={key}>{users[key].username}</div>
//         <div key={key}>{users[key].username || users[key].email}</div>

//     )}
// </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);