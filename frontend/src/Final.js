import React from 'react';
import history from './history'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Final.css'

export default class Final extends React.Component {
    constructor(props) {
      super(props);
      this.go_home=this.go_home.bind(this);
    }
    go_home()
    {
        history.push('/');
        history.go();
    }
    render() {
      return <div class="card  w-30">
        <div class="card-body">
          <h1 class="card-title" id="final_text">Thank you for your contribution</h1>
          <button id="final_button" onClick={this.go_home} class="btn btn-primary ">Go home</button>            </div>
        </div>
    }
  }