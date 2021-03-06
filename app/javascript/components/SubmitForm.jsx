import React from 'react'


class SubmitForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillUpdate(nextProps, nextState){
    var label = "";
    var content = "";
    var question = "";
    var choice0 = "";
    var choice1 = "";
    var image_video = "";
    var audio = "";

    if(nextProps.formSettings != undefined){
      if(nextProps.formSettings.label) label = nextProps.formSettings.label;
      if(nextProps.formSettings.content) content = nextProps.formSettings.content;
      if(nextProps.formSettings.question) question = nextProps.formSettings.question;
      if(nextProps.formSettings.choice0) choice0 = nextProps.formSettings.choice0;
      if(nextProps.formSettings.choice1) choice1 = nextProps.formSettings.choice1;
    }

    this.label.value = label;
    this.content.value = content;
    this.question.value = question;
    this.choice0.value = choice0;
    this.choice1.value = choice1;
    this.image_video.value = image_video;
    this.audio.value = audio;
    // console.log(nextProps);
    // console.log("hi");
  }

  handleSubmit(event) {

    event.preventDefault()

    //show loader
    var ajaxLoader = document.querySelector("#ajax_loader");
    ajaxLoader.style.display = "block";


    var headers = new Headers();
    headers.set('Accept','application/json');
    //headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)


    var label = this.label.value;
    var content = this.content.value;
    var question = this.question.value;
    var choice0 = this.choice0.value;
    var choice1 = this.choice1.value;
    var image_video = this.image_video.files[0];
    var audio = this.audio.files[0];

    var path;
    var method;
    var editPageId = this.props.formSettings.id
    if(editPageId){
      method = "PUT";
      path = '/stories/' + this.props.storyId +'/pages/' + editPageId;
    }else{
      method = "POST";
      path = '/stories/' + this.props.storyId +'/pages';
    }

    var that = this;

    var formData = new FormData();
    // formData.append("utf8","✓");
    // formData.append("authenticity_token",csrfToken);
    formData.append("page[label]",label);
    formData.append("page[content]",content);
    formData.append("page[question]",question);
    formData.append("page[image_video]",image_video);
    formData.append("page[audio]",audio);


    if(editPageId){
      formData.append("page[links_to_attributes][][id]",this.props.formSettings.choice0Id);
    }else{
      formData.append("page[links_to_attributes][][choice_index]",'0');
    }
    formData.append("page[links_to_attributes][][choice_text]",choice0);
    if(editPageId){
      formData.append("page[links_to_attributes][][id]",this.props.formSettings.choice1Id);
    }else{
      formData.append("page[links_to_attributes][][choice_index]",'1');
    }
    formData.append("page[links_to_attributes][][choice_text]",choice1);

    var fetchOptions = {
      method: method,
      headers,
      body: formData,
      credentials: 'same-origin',
    };
    var modal = document.getElementById('myModal');

    fetch(path,fetchOptions)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      var modal = document.getElementById('myModal');
      // console.log(data);
      console.log(data);
      // location.reload();
      // alert(data);
      ajaxLoader.style.display = "none";
      if(data.status =="success"){
        modal.style.display = "none";
        that.props.submitSuccess();
      }else {
        alert(data.message);
      }


    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
      ajaxLoader.style.display = "none";
      //location.reload();
    });


  }
  render(){
    return (
      <div>
        {this.props.children}
        <div id='myModal' className="modal">
          <div className="window modal-content">
            <div className="window-title">
              {this.props.formSettings.id ? "Edit Page" : "New Page"}
              <span id="close1">&times;</span>
            </div>
            <div className="window-body">
              <form  onSubmit={this.handleSubmit} className="form-popup">
                <label>
                  Label:<br/>
                  <input type="text" ref={(input) => this.label = input}/>
                </label>
                <label>
                  Content:<br/>
                  <textarea cols="50" rows="8" ref={(input) => this.content= input}></textarea>
                </label>
                <label>
                  { this.props.formSettings.id ? "Update Image/Video:" :  "Image/Video:"}
                  <br/>
                  <input type="file" ref={(input) => this.image_video = input}  />
                </label>
                <label>

                  { this.props.formSettings.id ? "Update Sound:" :  "Sound:"}
                  <br/>
                  <input type="file" ref={(input) => this.audio = input}  />
                </label>
                <label>
                  Question:<br/>
                  <input type="text" ref={(input) => this.question = input} />
                </label>
                <label>
                  Choice 1:<br/>
                  <input type="text" ref={(input) => this.choice0 = input} />
                </label>
                <label>
                  Choice 2:<br/>
                  <input type="text" ref={(input) => this.choice1 = input} />
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

export default SubmitForm;

