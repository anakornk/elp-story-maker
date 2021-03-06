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
    this.state = {position:{x: props.settings.x,y: props.settings.y},isDeleted: false}
  }
  componentDidMount() {
    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });
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
      that.props.onUpdate();
      console.log("update root_page_id success");
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  deletePage(){
    if(!confirm("Are you sure you want to delete this page?")) {
      return;
    }
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

    // console.log(url);

    fetch(url,fetchOptions)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      // console.log("delete node success");
      if(data.status == "success"){
        that.setState({isDeleted:true});
        that.props.onUpdate();
      }else{
        alert(data.message);
      }
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

    var imageVideoUrl = this.props.settings.image_video.url;
    var imageVideo = "";
    if(imageVideoUrl){
      var arr = imageVideoUrl.split('.');
      var fileExtension = arr[arr.length-1];
      if(['jpg','png','jpeg'].includes(fileExtension.toLowerCase())){
        //is image
        imageVideo = (
          <label>
          <img src={imageVideoUrl} alt="" />
          </label>
        );
      }else {
        imageVideo = (
           <label>
          <video controls src={imageVideoUrl}></video>
          </label>
        );
      }
    }

    var audioUrl = this.props.settings.audio.url;
    var audio = "";
    if(audioUrl){
      audio = (
        <label>
        Sound Effect:
        <audio src={audioUrl} controls></audio>
        </label>
      );
    }


    var question = this.props.settings.question;

    var window_title_className = "handle window-title";
    if(this.props.isRootPage){
      window_title_className += " window-title-active";
    }
    if(this.state.isDeleted){
      return null;
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
              <div className="flex-horizontal flex-end toolbar">
                <i onClick={this.updateStoryRootPage} className="fa fa-tree toolbar-item" aria-hidden="true" data-toggle="tooltip" title="Set as Root Page"></i>
                <ShowFormButton buttonId={className} defaultFormSettings={defaultFormSettings} onClick={this.props.onEditClick}>
                  <i id={className} className="fa fa-pencil toolbar-item button-edit" aria-hidden="true" data-toggle="tooltip" title="Edit"></i>
                </ShowFormButton>
                <i onClick={this.deletePage} className="fa fa-trash toolbar-item" aria-hidden="true" data-toggle="tooltip" title="Delete"></i>
              </div>

              <hr className="window-split"/>
              <div className="content">
                {content}
              </div>
              {imageVideo}
              {audio}
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
