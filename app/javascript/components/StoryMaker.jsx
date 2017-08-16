import React from 'react'
import DragBox from './DragBox'
import LineTo, { Line } from 'react-lineto';


class ShowFormButton extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var addButton = document.getElementById('add-btn');
    addButton.addEventListener('click', function(){
        modal.style.display = "block";
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click',function() {
        modal.style.display = "none";
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.label.value + ' ' + this.content.value + ' ' + this.question.value);
    // event.preventDefault();
  }
  render(){
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    var path = '/stories/' + this.props.storyId +'/pages'
    return (
      <div>
        <a id="add-btn" href="#" className="button button-hang">ADD</a>
        <div id="myModal" className="modal">
          <div className="window modal-content">
            <div className="window-title">
              Yo
              <span className="close">&times;</span>
            </div>
            <div className="window-body">
              <form action={path} onSubmit={this.handleSubmit} className="form" method='post' acceptCharset='UTF-8'>
                <input type='hidden' name='_method' value='post' />
                <input type='hidden' name='utf8' value='✓' />
                <input type='hidden' name='authenticity_token' value={csrfToken} />
                <label>
                  Label:
                  <input type="text" name="page[label]" ref={(input) => this.label = input} />
                </label>
                <label>
                  Content:
                  <input type="text" name="page[content]" ref={(input) => this.content= input} />
                </label>
                <label>
                  Question:
                  <input type="text" name="page[question]" ref={(input) => this.question = input} />
                </label>
                <input type='hidden' name='page[links_to_attributes][][choice_index]' value='0' />
                <label>
                  Choice 1:
                  <input type="text" name="page[links_to_attributes][][choice_text]" ref={(input) => this.choice0 = input} />
                </label>
                <input type='hidden' name='page[links_to_attributes][][choice_index]' value='1' />
                <label>
                  Choice 2:
                  <input type="text" name="page[links_to_attributes][][choice_text]" ref={(input) => this.choice1 = input} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

class StoryMaker extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
    this.reRender = this.reRender.bind(this);
    this.createLink = this.createLink.bind(this);
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
      return <DragBox settings={page} name={name} key={name} onMove={that.reRender}/>
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

    return (
      <div>
        <ShowFormButton storyId={this.props.story_id}/>
        <div>
          {dragboxes}
          {links}
        </div>
      </div>

    )
  }
}

export default StoryMaker;
