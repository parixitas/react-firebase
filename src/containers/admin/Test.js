import React, { Component } from 'react';
import {db} from '../../firebase/firebase';

class Dice extends Component {
constructor() {
  super();
  this.state = {
    currentItem: '',
    username: '',
    items: [],
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount() {
  const itemsRef = db.ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for(let item in items) {
      newState.push({
        id: item,
        title: items[item].title,
        user: items[item].user
      });
    }
    this.setState({
      items: newState
    })
  });

  
  
}

handleChange(e) {
  this.setState(
    {
      [e.target.name]: e.target.value
    }
  )
}

handleSubmit(e) {
  e.preventDefault();
  const itemsRef = db.ref('items');
  const item = {
    title: this.state.currentItem,
    user: this.state.username,
  }
  itemsRef.push(item);
  this.setState({
    currentItem: '',
    username: '',
  });
}

removeItem(itemId) {
  const itemRef = db.ref(`/items/${itemId}`);
  itemRef.remove();
}

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>heading</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
              <input type="text" name="currentItem" placeholder="What" onChange={this.handleChange} value={this.state.currentItem}/>
              <button>Add Item</button>
            </form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>
                        {item.title}
                        <p>by: {item.user}</p>
                        <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                      </h3>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Dice;
