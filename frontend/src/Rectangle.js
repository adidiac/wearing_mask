
export default class Rectangle
{
  constructor(color){
  this.x0=0;
  this.y0=0;
  this.x1=0;
  this.y1=0;
  this.image='';
  this.color=color;
  this.rect=document.createElement('div');
  }
  showRect() {
    this.rect.style.display = 'block';
    this.rect.style.position = 'absolute';
    this.rect.style.left =(this.x0-380) + 'px';
    this.rect.style.top = this.y0 + 'px';
    this.rect.style.width = (this.x1 - this.x0) + 'px';
    this.rect.style.height = (this.y1 - this.y0) + 'px';
    this.rect.style.border='solid 2px '+this.color;
}
  
}