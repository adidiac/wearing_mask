
import React from 'react';
import history from './history'
import people from './assets/people.jpg'
import api from './assets/api.jpeg'
import './Home.css'
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }
  handleClick()
  {
    history.push('/select');
    history.go();
  }
  render() {
    return <div id="start-screen">
       <div class="demo image above">
           <div id="user-screen" class="left" onClick={this.handleClick}>
           <img id="image_home" src={people} ></img>
           <h1 id="home_title">Home</h1>
           </div>
            <div id="api" class="right">
            <img id="image_api" src={api}></img>
            <h1 id="api_title">API</h1>
            </div>
        </div>
     </div>
  }
}