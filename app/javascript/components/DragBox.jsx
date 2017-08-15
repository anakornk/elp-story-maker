import React from 'react';
import Draggable from 'react-draggable';


class DragBox extends React.Component {
  constructor(props){
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.state = {position:props.position}
  }

  handleDrag(){
    this.props.onDrag();
    //{`block ${className}`}
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    // console.log('Event: ', e);
    // console.log('Data: ', data);
    // console.log(data.x)
    var newPos= {position:{x:data.x,y:data.y}}
    this.setState(newPos)
    // update db with new location

  };

  render(){
    var className = "haha";//this.props.settings.className;
    return(
          <Draggable
          axis="both"
          handle=".handle"
          position={this.state.position}
          grid={[25, 25]}
          onStart={this.eventLogger}
          onDrag={this.eventLogger}
          onStop={this.eventLogger}
          >
          <div className={`block ${className}`}>
            <div className="handle title">Window Name</div>
            <div  className="content">
              <div className="label">
                Penny in the forest
              </div>
              <div className="buttons">
                <span className="button">Yes</span>
                <span className="button">No</span>
              </div>
            </div>
          </div>
        </Draggable>
    )
  }

}

export default DragBox;
