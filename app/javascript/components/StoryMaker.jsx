import React from 'react'
import DragBox from './DragBox'
import LineTo, { Line } from 'react-lineto';
import ShowFormButton from './ShowFormButton';
import SubmitForm from './SubmitForm'


class StoryMaker extends React.Component {

  constructor(props){
    super(props)
    this.state = {formSettings:{}, editPageId:null};
    this.reRender = this.reRender.bind(this);
    this.createLink = this.createLink.bind(this);
    this.setFormSettings = this.setFormSettings.bind(this);
  }

  createLink(story_id,src_page_id,link_id,dst_page_id){
    console.log(story_id + " " + src_page_id + " " + link_id + " " + dst_page_id);
    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');

    var that = this;
    var url = 'http://localhost:3000/stories/'+ story_id+ '/pages/' + src_page_id;
    var payload = {page: {links_to_attributes:[{id:link_id ,dst_page_id:dst_page_id}] }}

    var fetchOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    };

    fetch(url,fetchOptions)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      location.reload();
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  componentDidMount() {
    // var that = this;
    // setInterval(function(){ that.setState(Object.assign({}, that.state)); }, 100);
    var links = this.props.links
    links.forEach(function(link){
      var src_name = "pageid-"+link.src_page_id
      var buttons = document.querySelector("." + src_name + " .buttons")
      // console.log(buttons)
      //
      var identifier = "pageid-"+link.src_page_id + "-" + link.id

      var button = document.createElement('div');
      button.setAttribute("class", "button " + identifier)
      button.innerHTML = link.choice_text
      // console.log(button)
      buttons.appendChild(button)
    })

    this.setState({});


    // create link with two clicks
    var that = this;
    document.body.addEventListener('click',function(e){
      // console.log(e);
      if(e.target.classList.contains('button')){
        // console.log("is button");
        that.last = e.target
        that.lastIsButton = true;
      }else if(e.target.classList.contains('window-title')){
        // console.log("is window");
        // console.log(e.target.parentNode.classList[1])
        if(that.lastIsButton){

          var temp = that.last.classList[1].split("-");
          var story_id = that.props.story_id
          var src_page_id = temp[1];
          var link_id = temp[2];
          var dst_page_id = e.target.parentNode.classList[1].split("-")[1];
          // console.log(src_page_id + " " + link_id + " " + dst_page_id);
          that.createLink(story_id,src_page_id,link_id,dst_page_id)
        }
        that.last = null;
        that.lastIsButton = false;
      }else {
        that.last = null;
        that.lastIsButton = false;
      }
    })

  }

  reRender(){
    this.setState({});
  }

  setFormSettings(formSettings){
    // console.log(formSettings);
    this.setState({formSettings:formSettings});
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
      var name = "pageid-"+ page.id;
      return <DragBox storyId={that.props.story_id} settings={page} name={name} key={name} onMove={that.reRender} onEditClick={that.setFormSettings}/>
    });
    //line
    var links = this.props.links;
    // console.log(links);
    links = links.filter(function(link){
      return link.dst_page_id != null
    });

    links = links.map(function(link){
      var src_name = "pageid-"+link.src_page_id + "-" + link.id
      var dst_name = "pageid-"+link.dst_page_id

      // buttons.appendChild(button);

      return (
        <LineTo from={src_name} to={dst_name}
        border="2px solid black" className="line-XYZ"
        fromAnchor="bottom center"
        toAnchor="top center" key={src_name} />
      )
    });

    //form settings for add

    return (
      <div>
        <SubmitForm storyId={this.props.story_id} formSettings={this.state.formSettings}/>
        <ShowFormButton buttonId="add-btn" defaultFormSettings={{}} onClick={this.setFormSettings}>
          <a id="add-btn" href="#" className="button button-hang">ADD</a>
        </ShowFormButton>
        <div>
          {dragboxes}
          {links}
        </div>
      </div>

    )
  }
}

export default StoryMaker;
