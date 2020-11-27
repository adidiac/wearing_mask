import React from 'react';
export default class Done_Image extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return <div id="containerEdited">
            <image id="imageEdited"></image>
            <div id="infoEdited">
                <p id="correct"></p>
                <p id="incorrect"></p>
            </div>
        </div>;
    }
}