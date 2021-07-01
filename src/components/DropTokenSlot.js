import React from 'react';

export default class DropTokenSlot extends React.Component {
    renderSlot(){
        switch(this.props.identifier){
            case 1:
                return <div className="droptoken-player1 droptoken-slot"></div>
            case 2:
                return <div className="droptoken-player2 droptoken-slot"></div>
            default:
                return <div onClick={()=> this.props.dropper(this.props.coordinate)} className="droptoken-slot"></div>
    
        }
    }

    render(){
        return this.renderSlot();
    }
}