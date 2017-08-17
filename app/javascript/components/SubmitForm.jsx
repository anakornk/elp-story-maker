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

    // console.log(nextProps);
    // console.log("hi");
  }

  handleSubmit(event) {

    var headers = new Headers();
    headers.set('Accept','application/json');
    //headers.set('Content-Type', 'application/json');

    var csrfToken = $('meta[name=csrf-token]').attr('content');


    var label = this.label.value;
    var content = this.content.value;
    var question = this.question.value;
    var choice0 = this.choice0.value;
    var choice1 = this.choice1.value;
    var image = this.image.files[0];

    var path;
    var method;
    var editPageId = this.props.formSettings.id
    if(editPageId){
      method = "PUT";
      path = 'http://localhost:3000/stories/' + this.props.storyId +'/pages/' + editPageId;
    }else{
      method = "POST";
      path = 'http://localhost:3000/stories/' + this.props.storyId +'/pages';
    }

    var formData = new FormData();
    formData.append("_method",method);
    formData.append("utf8","✓");
    formData.append("authenticity_token",csrfToken);
    formData.append("page[label]",label);
    formData.append("page[content]",content);
    formData.append("page[question]",question);
    formData.append("page[image]",image);

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
      body: formData
    };

    fetch(path,fetchOptions)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var modal = document.getElementById('myModal');
      modal.style.display = "none";

      location.reload();
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });


  }
  render(){
    return (
      <div>
        {this.props.children}
        <div id='myModal' className="modal">
          <div className="window modal-content">
            <div className="window-title">
              Yo
              <span className="close">&times;</span>
            </div>
            <div className="window-body">
              <form  onSubmit={this.handleSubmit} className="form-popup">
                <label>
                  Label:
                  <input type="text" ref={(input) => this.label = input}/>
                </label>
                <label>
                  Content:
                  <input type="text" ref={(input) => this.content= input}/>
                </label>
                <label>
                  Question:
                  <input type="text" ref={(input) => this.question = input} />
                </label>
                <label>
                  <input type="file" ref={(input) => this.image = input}  />
                </label>
                <label>
                  Choice 1:
                  <input type="text" ref={(input) => this.choice0 = input} />
                </label>
                <label>
                  Choice 2:
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

