import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import LineTo, { Line } from 'react-lineto';


class DragBox extends React.Component {
  constructor(props){
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(){
    this.props.onDrag();
    //{`block ${className}`}
  }
  render(){
    var className = this.props.settings.className;
    return(
          <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{x: this.props.settings.x, y: this.props.settings.y}}
          position={null}
          grid={[25, 25]}
          onStart={this.handleDrag}
          onDrag={this.handleDrag}
          onStop={this.handleDrag}
          >
          <div className={`block ${className}`}>
            <div className="handle title">Window Name</div>
            <div className="content">Window Content<br/>Line 2 <br/> Line 3</div>
          </div>
        </Draggable>
    )
  }

}

class App extends React.Component {
  constructor(props){
    super(props);
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    this.setState({});
    // var that = this;
    // setInterval(function(){ that.setState(Object.assign({}, that.state)); }, 100);
  }

  reRender(){
    this.setState({});
  }

  render(){
    var settings1 = {x:0,y:0,className: "item-G1"}
    var settings2= {x:100,y:100,className: "item-H1"}
    var settings3= {x:400,y:100,className: "item-H2"}
    return (
      <div>
        <DragBox onDrag={this.reRender} settings={settings1}/>
        <DragBox onDrag={this.reRender} settings={settings2}/>
        <DragBox onDrag={this.reRender} settings={settings3}/>
        <LineTo from={settings1.className} to={settings2.className}
                border="2px solid black" className="line-XYZ"
                fromAnchor="bottom center"
                toAnchor="top center"/>
        <LineTo from={settings1.className} to={settings3.className}
                border="2px solid black" className="line-XYZ"
                fromAnchor="bottom center"
                toAnchor="top center"/>
      </div>
    );
  }
}
var g = document.createElement('div');
 g.setAttribute("id", "cont")

ReactDOM.render(<App/>,  document.body.appendChild(g));
