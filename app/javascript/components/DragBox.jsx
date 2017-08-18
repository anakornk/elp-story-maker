import React from 'react';
import Draggable from 'react-draggable';
import ShowFormButton from './ShowFormButton';

class DragBox extends React.Component {
  constructor(props){
    super(props);
    this.handleStart = this.handleStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.updateStoryRootPage = this.updateStoryRootPage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    // console.log("start")
    // console.log(props)
    this.state = {position:{x: props.settings.x,y: props.settings.y}}
  }


  updatePosition(x,y) {
    var headers = new Headers();
    // Tell the server we want JSON back
    headers.set('Accept', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)
    // 1.2 Form Data
    // We need to properly format the submitted fields.
    // Here we will use the same format the browser submits POST forms.
    // You could use a different format, depending on your server, such
    // as JSON or XML.
    var formData = new FormData();
    // for (var i = 0; i < formEl.length; ++i) {
      // formData.append(formEl[i].name, formEl[i].value);
    // }
    formData.append("page[x]",x)
    formData.append("page[y]",y)

    // update
    var that = this;
    var url = '/stories/'+this.props.storyId+'/pages/' + this.props.settings.id;

    var fetchOptions = {
      method: 'PUT',
      headers,
      body: formData,
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
      // console.log(data)
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  updateStoryRootPage(){
    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ this.props.storyId
    var payload = {story: {root_page_id: this.props.settings.id}}
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
      // console.log(data);
      console.log("update root_page_id success");
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  deletePage(){
    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ this.props.storyId + '/pages/' + this.props.settings.id;
    var fetchOptions = {
      method: 'DELETE',
      headers,
      credentials: 'same-origin'
    };

    console.log(url);

    fetch(url,fetchOptions)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      console.log("delete node success");
      document.location.reload();
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });

  }
  handleStart(e: MouseEvent, data: Object){
    // var newPos = {position:{x:data.x,y:data.y}}
    // this.setState(newPos)
    // this.props.onMove()

  }

  handleDrag(e: MouseEvent, data: Object){
    var newPos = {position:{x:data.x,y:data.y}}
    this.setState(newPos)
    this.props.onMove()
  }

  handleStop(e: MouseEvent, data: Object){
    // console.log(data)
    var newPos = {position:{x:data.x,y:data.y}}
    this.setState(newPos)
    this.props.onMove()
    // console.log(this)
    this.updatePosition(data.x,data.y)

  }



  eventLogger = (e: MouseEvent, data: Object) => {
    // console.log('Event: ', e);
    // console.log('Data: ', data);
    // console.log(data.x)
    var newPos = {position:{x:data.x,y:data.y}}
    this.setState(newPos)
    // update db with new location

  };

  render(){
    var className = this.props.name;
    var windowTitle= this.props.settings.label;
    var content = this.props.settings.content;
    if(content.length > 144) {
      content = content.slice(0,140) + "..."
    }
    var defaultFormSettings = this.props.settings;
    var pageId = this.props.settings.id;
    // var imgUrl = this.props.image.url;
    var imgUrl = this.props.settings.image.url;
    var question = this.props.settings.question;

    var window_title_className = "handle window-title";
    if(this.props.isRootPage){
      window_title_className += " window-title-active";
    }

    return(
          <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={this.state.position}
          position={this.state.position}
          grid={[25, 25]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          >
          <div className={`block ${className} window`} data-pageid={pageId}>
            <div className={window_title_className}>
              {windowTitle}
            </div>
            <div  className="window-body">
              <div className="flex-horizontal">
                <ShowFormButton buttonId={className} defaultFormSettings={defaultFormSettings} onClick={this.props.onEditClick}>
                  <span id={className} className="button-edit">Edit</span>
                </ShowFormButton>
                  |
                <div onClick={this.updateStoryRootPage}>Root</div>
                  |
                <div onClick={this.deletePage}>&#10007;</div>
              </div>

              <hr className="window-split"/>
              <div className="content">
                {content}
              </div>
              <img src={imgUrl} alt="" width="100px" height="100px"/>
              <hr className="window-split"/>
              <div className="question">
                {question}
              </div>
              <div className="buttons">
              </div>
            </div>
          </div>
        </Draggable>
    )
  }

}

export default DragBox;
