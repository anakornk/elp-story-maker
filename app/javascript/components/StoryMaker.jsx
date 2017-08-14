import React from 'react'
import HelloMessage from './HelloMessage'
class StoryMaker extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    //{pages: [],links:[]}
    // console.log(this.props.pages[0].label)
    return (
      <div><HelloMessage/></div>
    )
  }
}

export default StoryMaker;
