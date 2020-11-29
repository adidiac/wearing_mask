import React from 'react';
import Rectangle from './Rectangle'
import './Done_Image.css'
export default class Done_Image extends React.Component
{
    constructor(props)
    {
        super(props);
        this.list=props.list;
        this.count_correct=0;
        this.count_incorrect=0;
        console.log(this.list);
        let c=0,ic=0;
        for(let i=0;i<this.list.length;i++)
        {
            if(this.list[i].type=="correct")
            {
                c++;
            }
            else
                ic++;
        }
        this.count_correct=c;
        this.count_incorrect=ic;
    }
    render()
    {
        return <div id="containerEdited" class="slide">
            <img id="imageEdited" src={this.list[0].image}></img>
            <div id="infoEdited">
                <p id="correct">{this.count_correct} correct faces</p>
                <p id="incorrect">{this.count_incorrect} incorrect faces</p>
            </div>
        </div>;
    }
}