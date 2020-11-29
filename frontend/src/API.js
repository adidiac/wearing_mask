import React from 'react';


export default class API extends React.Component {
    constructor(props) {
      super(props);
      this.state={
          text:''
      }
    }
    componentDidMount()
    {
        fetch("http://localhost:9000/api")
        .then(res => res.text())
        .then(res => 
        {
            console.log(res);
          this.setState({
              text:res
          })
        });
    }
    render() {
      return <div>
          {this.state.text}
        </div>
    }
  }