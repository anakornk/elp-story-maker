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
