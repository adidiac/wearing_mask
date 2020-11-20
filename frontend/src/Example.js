import React from 'react';
import history from './history'
import people from './assets/people.jpg'
import api from './assets/api.jpeg'
import './Example.css'
function drag(ev) {
    console.log("drag");
    ev.dataTransfer.setData("text", ev.target.id);
  }
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.allowDrop=this.allowDrop.bind(this);
  }
 allowDrop(ev) {
    console.log("allow drop");
    ev.preventDefault();
  }
 drop(ev) {
     console.log("drop");
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  handleClick()
  {
    history.push('/select');
    history.go();
  }
  render() {
    return <div id="start-screen">
        <div id="div1" onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.allowDrop(e)}></div>

<img id="drag1" src={people} draggable={true} onDragStart={drag} width="336" height="69"></img>
         </div>
  }
}