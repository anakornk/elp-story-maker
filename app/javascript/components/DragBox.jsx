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
    var url = 'http://localhost:3000/stories/'+this.props.storyId+'/pages/' + this.props.settings.id;

    var fetchOptions = {
      method: 'PUT',
      headers,
      body: formData
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

    var that = this;
    var url = 'http://localhost:3000/stories/'+ this.props.storyId
    var payload = {story: {root_page_id: this.props.settings.id}}
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

    var that = this;
    var url = 'http://localhost:3000/stories/'+ this.props.storyId + '/pages/' + this.props.settings.id;
    var fetchOptions = {
      method: 'DELETE',
      headers
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
    var defaultFormSettings = this.props.settings;
    var pageId = this.props.settings.id;

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
            <div className="handle window-title">
              {windowTitle}
            </div>
            <div  className="window-body">
              <ShowFormButton buttonId={className} defaultFormSettings={defaultFormSettings} onClick={this.props.onEditClick}>
                <span id={className} className="button-edit">Edit</span>
              </ShowFormButton>
              <div onClick={this.updateStoryRootPage}>Set Root</div>
              <div onClick={this.deletePage}>Delete</div>
              <hr/>
              <div className="content">
                {content}
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
