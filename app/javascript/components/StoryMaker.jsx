import React from 'react'
import DragBox from './DragBox'
class StoryMaker extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    //{pages: [],links:[]}
    // console.log(this.props.pages[0].label)
    var settings1 = {x:0,y:0,className: "item-G1"}

    return (
      <div><DragBox onDrag={(e)=>(e)} position={{x:100,y:100}}/></div>
    )
  }
}

export default StoryMaker;
