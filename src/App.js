import React from 'react';
import DropTokenColumn from  './components/DropTokenColumn.js';
import DropTokenSlot from  './components/DropTokenSlot.js';
import "./App.css"

export default class DropToken extends React.Component {
   constructor(){
       super()
       this.boardModel = []
       this.state = {
           turn: true,
           board: [],
           gamestarted: false
       }
   }  

   componentDidUpdate(){
       console.log(this.state.board)
   }

   generateModel(){
    let newboardmodel = []
    for(let x = 0; x < 4; x ++){
        let newColumn = []
        for(let y = 0; y < 4; y++){
            newColumn.push(0)
        }
        newboardmodel.push(newColumn)
    }
    this.boardModel = newboardmodel
    // console.log(this.boardModel)
   }
   
   
   generateBoard(){
       this.generateModel()
    let gameboard = []

       for(let i = 0; i < 4; i++){
        let newColumn = []
        for(let k = 0; k < 4; k++){
            newColumn.push(<DropTokenSlot indentifier={0} dropper={this.dropper} coordinate={[i,k]}></DropTokenSlot>)
        }
        // console.log(newColumn)
        gameboard.push(<DropTokenColumn column={newColumn} ></DropTokenColumn>)
       }

       this.setState({
        board: gameboard,
        gamestarted: true
    })
   }

   updateRenderFromModel(){
       let newBoardRender = []

       for(let x = 0; x < this.boardModel.length; x ++){

        let newColumn = []

           for(let y = 0; y < this.boardModel[x].length; y ++){
               if(this.boardModel[x][y] === 1){
                        newColumn.push(<DropTokenSlot identifier={1} dropper={this.dropper} coordinate={[x,y]}></DropTokenSlot>)
               }else if(this.boardModel[x][y] === 2){
                        newColumn.push(<DropTokenSlot identifier={2} dropper={this.dropper} coordinate={[x,y]}></DropTokenSlot>)
               } else {
                        newColumn.push(<DropTokenSlot identifier={0} dropper={this.dropper} coordinate={[x,y]}></DropTokenSlot>)
               }
           }
        //    console.log(newColumn)
           newBoardRender.push(<DropTokenColumn column={newColumn} ></DropTokenColumn>)
       }
       return newBoardRender
   }

   dropper = (coordinates) => {
       let landingcoordinates = []
            for(let y = 0; y < this.boardModel[coordinates[0]].length; y ++){
                if(this.boardModel[coordinates[0]][y] === 0){
                    this.boardModel[coordinates[0]][y] = this.state.turn? 1: 2
                    landingcoordinates.push(coordinates[0])
                    landingcoordinates.push(y)
                    break;
                }
            }
            if(this.checkpositiveDiagonal(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinner(this.state.turn? 1: 2)
            } else if( this.checkhorizontal(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinner(this.state.turn? 1: 2)
            } else if(this.checkvertical(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinner(this.state.turn? 1: 2)
            } else if(this.checknegativeDiagonal(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinner(this.state.turn? 1: 2)
            } else {
                this.setState(prev => {

                    return {
                        board: this.updateRenderFromModel(),
                        turn: !prev.turn 
                    }
                    
                })
            }
   }

   checkpositiveDiagonal(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[0] + counter +1 ===4){
            break;
        } else if(coordinates[1] + counter +1 ===4) {
            break;
        }
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0] + counter - backwardsCounter][coordinates[1] + counter - backwardsCounter] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[0] + counter - (backwardsCounter +1) === -1){
            break;
        } else if(coordinates[1] + counter - (backwardsCounter +1) === -1){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }

   checknegativeDiagonal(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[0] + counter +1 ===4){
            break;
        } else if(coordinates[1] - counter - 1 === - 1) {
            break;
        }
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0] + counter - backwardsCounter][coordinates[1] - counter + backwardsCounter] === identifier){
            wintracker += 1
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[0] + counter - (backwardsCounter +1) === -1){
            break;
        } else if(coordinates[1] - counter + (backwardsCounter + 1) === 4){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }

   checkhorizontal(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[0] + counter + 1 === 4){
            break;
        } 
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0]   + counter - backwardsCounter][coordinates[1]] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[0] + counter - (backwardsCounter +1) === -1){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }

   checkvertical(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[1] + counter + 1 === 6){
            break;
        } 
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0]][coordinates[1]  + counter - backwardsCounter] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[1] + counter - (backwardsCounter +1) === -1){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }


   executeWinner(identifier){
       let player = ""
       if(identifier === 1){
           player = "Red"
       } else if(identifier === 2){
           player = "Blue"
       }

        this.setState({
        board: <div className="droptoken-winner-statement">{`${player} Won the game!`}</div>
        })
   }


    render(){
        return(
          <div className="game-wrap">
            <h1>Drop Token</h1>
            <div className="droptoken">
                {this.state.gamestarted? this.state.board : <div onClick={()=> this.generateBoard()} className="start-game"> start</div> }
            </div> 
          </div> 
        )
    }
}



