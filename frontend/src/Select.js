import React from 'react';
import history from './history'
import 'axios'
import './Select.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery'
import Rectangle from './Rectangle'
import Done_Image from './Done_Image'

export default class Select extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        list:[],
        list_edited:[]
      }
      this.rect=[]
      this.counter=0;
      this.grab=false;
      this.mouseup=this.mouseup.bind(this);
      this.mousedown=this.mousedown.bind(this);
      this.mousemove=this.mousemove.bind(this);
      this.crop_red=this.crop_red.bind(this);
      this.crop_green=this.crop_green.bind(this);
      this.doneImage=this.doneImage.bind(this);
      this.reset=this.reset.bind(this);
      this.go_back=this.go_back.bind(this);
      this.callAPI=this.callAPI.bind(this)
    }
    mouseup(e) {
      this.grab=false;
  }
    mousedown(e) {
      document.getElementById('image').children[0].ondragstart = function() { return false; };
      this.grab = true;
      this.rect[this.rect.length-1].x0 = e.clientX;
      this.rect[this.rect.length-1].y0 = e.clientY;

  }
    mousemove(e) {
      if (this.grab) {

          this.rect[this.rect.length-1].x1 = e.clientX;
          this.rect[this.rect.length-1].y1 = e.clientY;
          this.rect[this.rect.length-1].showRect();
      }
  }
  callAPI() {
    let send=[];
    let edited_length=this.state.list_edited.length;
    var offsetLeft=document.getElementById("image").getBoundingClientRect().left;
    var offsetTop=document.getElementById("image").getBoundingClientRect().top;
    for(let i=0;i<edited_length;i++)
    {
      let v=this.state.list_edited[i].props.list;
      for(let j=0;j<v.length;j++)
        {
          send.push({picture:v[j].image,x0:v[j].x0-offsetLeft,x1:v[j].x1-offsetLeft,y0:v[j].y0-offsetTop,y1:v[j].y1-offsetTop,type:v[j].type});
        }
    }
    console.log(send);
    fetch("http://localhost:9000/api",
    {method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({message:send})})
        .then(res => res.text())
        .then(res => 
        {
          console.log(res);
          history.push('/final');
          history.go();
        });
}
  crop_red()
  {
    this.rect.push(new Rectangle('red',"incorrect"));
    this.counter++;
    var div = document.getElementById('image');
    this.rect[this.rect.length-1].image=div.children[0].getAttribute('src');
    div.appendChild(this.rect[this.rect.length-1].rect);
    div.addEventListener('mousedown', this.mousedown);
    div.addEventListener('mouseup',  this.mouseup);
    div.addEventListener('mousemove', this. mousemove);
  }
  crop_green()
  {

    this.rect.push(new Rectangle('green','correct'));
    this.counter++;
    var div = document.getElementById('image');
    this.rect[this.rect.length-1].image=div.children[0].getAttribute('src');
    div.appendChild(this.rect[this.rect.length-1].rect);
    div.addEventListener('mousedown', this. mousedown);
    div.addEventListener('mouseup', this. mouseup);
    div.addEventListener('mousemove',  this.mousemove);
  }
    allowDrop(ev) {
      ev.preventDefault();
      
    }
    drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var img=document.getElementById(data);
      ev.target.appendChild(img);
      document.getElementById('image').children[0].style.height='100%';
      document.getElementById('image').children[0].style.width='100%';
      img.removeAttribute('draggable');

    }
    doneImage()
    {
      let list=this.state.list_edited;
      list.push(<Done_Image list={[...this.rect]} />);
      this.setState({
        list_edited:list
      });
      let i=this.rect.length;
      for(let j=0;j<i;j++)
      {
        console.log(j+"  ,"+i);
        var elem=this.rect[j].rect;
        document.getElementById("image").removeChild(elem);
      }
      for(let j=0;j<i;j++)
      {
        
        this.rect.pop();
      }
      let image=document.getElementById('image').children[0];
      document.getElementById("image").removeChild(image);
    }
    go_back()
    {
      history.push('/');
      history.go();
    }
    reset()
    {
      console.log("something good");
      let i=this.rect.length;
      for(let j=0;j<i;j++)
      {
        console.log(j+"  ,"+i);
        var elem=this.rect[j].rect;
          document.getElementById("image").removeChild(elem);
      }
      for(let j=0;j<i;j++)
      {
        this.rect.pop();
      }
    }
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
    async componentDidMount() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://pixabay.com/api/?key=19115102-7b703bcfa6d937afea0e0d525&q=wear+mask&image_type=photo&pretty=true"; // site that doesn’t send Access-Control-*
      await fetch(proxyurl + url).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            list:result.hits,
          });
        }) ;

    

    }
    render() {
      return <div id="select-screen">
         <div id="needitat">
           <div id="back_button" class="btn btn-success" onClick={this.go_back}>
           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
</svg> Go back
             </div>
             <div id="tools">
               <div id="good-tool" class="btn btn-success" onClick={this.crop_green}>Crop for corect wear</div>
               <div id="bad-tool" class="btn btn-danger" onClick={this.crop_red}>Crop for bad wear</div>
              </div>
          <div id="unedited_images">
            {
              this.state.list.map((e,i)=><img class="slide" draggable={true} id={e["webformatURL"]}  onDragStart={(e)=>this.drag(e)} src={e["webformatURL"]} key={i}></img>)
            }
            </div>
          </div>
         <div id="editare">
           <div id="image" onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.allowDrop(e)}>
             </div>
             <div id="row-buttons">
               <div id="reset-button" class="btn btn-danger" onClick={this.reset}>
               <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>
                 Reset everything
                 </div>
                 <div id="zoom" class="btn btn-success">
                 <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
</svg>Zoom
                  </div>
                  <div id="done" class="btn btn-success" onClick={this.doneImage}> Done</div>
               </div>
            </div>
            <div id="editat">
              <div id="edited-images">
                {
                  this.state.list_edited
                }
                </div>
                  <div id="submit" class="btn btn-success" onClick={this.callAPI}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>
                    Submit
                  
                    </div>
              </div>
          </div>
    }
  }

