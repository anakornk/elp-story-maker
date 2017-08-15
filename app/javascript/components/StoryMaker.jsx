import React from 'react'
import DragBox from './DragBox'
import LineTo, { Line } from 'react-lineto';

class StoryMaker extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    this.setState({});
    // var that = this;
    // setInterval(function(){ that.setState(Object.assign({}, that.state)); }, 100);
    var links = this.props.links
    links.forEach(function(link){
      var src_name = "pageid-"+link.src_page_id
      var buttons = document.querySelector("." + src_name + " .buttons")
      console.log(buttons)
      //
      var identifier = "pageid-"+link.src_page_id + "-" + link.choice_index

      var button = document.createElement('div');
      button.setAttribute("class", "button " + identifier)
      button.innerHTML = link.choice_text
      console.log(button)
      buttons.appendChild(button)
    })
  }

  reRender(){
    this.setState({});
  }

  render(){
    //{pages: [],links:[]}
    // console.log(this.props.pages[0].label)
    // var settings1 = {x:0,y:0,className: "item-G1"}
    var that = this;

    // pages set up
    var pages = this.props.pages
    // console.log(pages)
    pages = pages.sort(function(page1,page2){
      return page1.id > page2.id
    })

    var dragboxes = pages.map(function(page){
      var name = "pageid-"+page.id;
      return <DragBox settings={page} name={name} key={name} onMove={that.reRender}/>
    });
    //line
    var links = this.props.links
    links = links.map(function(link){
      var src_name = "pageid-"+link.src_page_id + "-" + link.choice_index
      var dst_name = "pageid-"+link.dst_page_id

      // buttons.appendChild(button);

      return (
        <LineTo from={src_name} to={dst_name}
        border="2px solid black" className="line-XYZ"
        fromAnchor="bottom center"
        toAnchor="top center" key={src_name} />
      )
    });

    return (
      <div>
        <a href="#" className="button button-hang">ADD</a>
        <div>
          {dragboxes}
          {links}
        </div>
      </div>

    )
  }
}

export default StoryMaker;
