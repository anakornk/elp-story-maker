import React from 'react'
import DragBox from './DragBox'
import LineTo, { Line } from 'react-lineto';
import ShowFormButton from './ShowFormButton';
import SubmitForm from './SubmitForm'


class StoryMaker extends React.Component {

  constructor(props){
    super(props)
    this.state = {formSettings:{}, storiesData: props};
    console.log(this.state);
    this.reRender = this.reRender.bind(this);
    this.createLink = this.createLink.bind(this);
    this.setFormSettings = this.setFormSettings.bind(this);
    this.fetchPageJson = this.fetchPageJson.bind(this);
    this.updateChoiceText = this.updateChoiceText.bind(this);
  }

  createLink(story_id,src_page_id,link_id,dst_page_id){
    console.log(story_id + " " + src_page_id + " " + link_id + " " + dst_page_id);
    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ story_id+ '/pages/' + src_page_id;
    var payload = {page: {links_to_attributes:[{id:link_id ,dst_page_id:dst_page_id}] }}

    var fetchOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
      credentials: 'same-origin'
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
      that.fetchPageJson();
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  updateChoiceText(pages,links){
    // console.log(pages);
    pages.forEach(function(page){
      var src_name = "pid-"+ page.id;
      var buttons = document.querySelector("." + src_name + " .buttons");
      // console.log("." + src_name + " .buttons");
      buttons.innerHTML = "";
    });

    links.forEach(function(link){
      var src_name = "pid-"+link.src_page_id
      var buttons = document.querySelector("." + src_name + " .buttons")
      var identifier = "pid-"+link.src_page_id + "-" + link.id

      var button = document.createElement('div');
      button.innerHTML = link.choice_text
      button.setAttribute("class", "button " + identifier)
      if(link.choice_text == ""){
        button.className += " hidden"
      }
      button.setAttribute("data-pageid",link.src_page_id)
      button.setAttribute("data-linkid",link.id)
      // console.log(button)
      buttons.appendChild(button)
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.storiesData != prevState.storiesData){
      var pages = this.state.storiesData.pages
      var links = this.state.storiesData.links;
      this.updateChoiceText(pages,links);
    }
  }

  componentDidMount() {
    // var that = this;
    // setInterval(function(){ that.setState(Object.assign({}, that.state)); }, 100);
    var pages = this.state.storiesData.pages
    var links = this.state.storiesData.links

    this.updateChoiceText(pages,links);


    // create link with two clicks
    var that = this;
    document.body.addEventListener('click',function(e){
      // console.log(e);
      if(that.lastIsButton){
        that.lastObj.style.backgroundColor = "#222222";
      }
      if(e.target.classList.contains('button')){
        // console.log("is button");
        that.lastObj = e.target
        that.lastIsButton = true;
        e.target.style.backgroundColor = "#C52F24";
      }else if(e.target.classList.contains('window-title')){
        // console.log("is window");
        // console.log(e.target.parentNode.classList[1])
        if(that.lastIsButton){
          var story_id = that.state.storiesData.story_id
          var src_page_id = that.lastObj.getAttribute("data-pageid")
          var link_id =  that.lastObj.getAttribute("data-linkid")
          var dst_page_id = e.target.parentNode.getAttribute("data-pageid")
          // console.log(src_page_id + " " + link_id + " " + dst_page_id);
          that.createLink(story_id,src_page_id,link_id,dst_page_id)
        }
        that.lastObj = null;
        that.lastIsButton = false;
      }else {
        that.lastObj = null;
        that.lastIsButton = false;
      }
    })


    setTimeout(function(){
      that.setState({});
    },100);
  }


  reRender(){
    this.setState({});
  }

  setFormSettings(formSettings){
    // console.log(formSettings);
    this.setState({formSettings:formSettings});
  }

  fetchPageJson(){
    var headers = new Headers();
    headers.set('Accept','application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ this.state.storiesData.story_id;

    var fetchOptions = {
      method: 'GET',
      headers,
      credentials: 'same-origin'
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
      // location.reload();
      that.setState({storiesData:data})
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  render(){
    var that = this;


    //DragBoxes
    // pages set up
    var pages = this.state.storiesData.pages
    // console.log(pages)

    // pages = pages.sort(function(page1,page2){
    //   return page1.id > page2.id
    // })

    var dragboxes = pages.map(function(page){
      //name is used to draw lines and is id of edit
      var name = "pid-"+ page.id;
      var isRootPage = false;
      if(page.id == that.state.storiesData.root_page_id){
        isRootPage = true;
      }
      return (
        <DragBox storyId={that.state.storiesData.story_id} settings={page} isRootPage={isRootPage}
        name={name} key={name} onMove={that.reRender} onEditClick={that.setFormSettings}
        onUpdate={that.fetchPageJson}
        />
      );
    });

    //Links / Draw Lines
    var links = this.state.storiesData.links;
    links = links.filter(function(link){
      return link.dst_page_id != null
    });

    links = links.map(function(link){
      var src_name = "pid-"+link.src_page_id + "-" + link.id
      var dst_name = "pid-"+link.dst_page_id
      return (
        <LineTo from={src_name} to={dst_name}
        border="2px solid black" className="line-XYZ"
        fromAnchor="bottom center"
        toAnchor="top center" key={src_name} />
      )
    });

    return (
      <div className="story-maker">
        <div id='ajax_loader'>
            <img src="/images/ajax-loader-2.gif"></img>
        </div>
        <SubmitForm storyId={this.state.storiesData.story_id} formSettings={this.state.formSettings} submitSuccess={this.fetchPageJson}/>
        <ShowFormButton buttonId="add-btn" defaultFormSettings={{}} onClick={this.setFormSettings}>
          <span id="add-btn">&nbsp;&#x271A;&nbsp;</span>
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
