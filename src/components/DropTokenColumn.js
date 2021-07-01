import React from 'react';

export default class DropTokenColumn extends React.Component{

    render(){
        return (
            <div className="droptoken-column" key={this.props.column}>
                {this.props.column}
            </div>
        )
    }
}