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
    alert('A name was submitted: ' + this.label.value + ' ' + this.content.value + ' ' + this.question.value);
    // event.preventDefault();
  }
  render(){
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    var path = '/stories/' + this.props.storyId +'/pages';
    var method = "post";
    var editPageId = this.props.formSettings.editPageId;
    var hidden0 = (<input type='hidden' name='page[links_to_attributes][][choice_index]' value='0' />);
    var hidden1 = (<input type='hidden' name='page[links_to_attributes][][choice_index]' value='1' />);
    if(editPageId){
      path = '/stories/' + this.props.storyId +'/pages/' + editPageId;
      method = "put";
      if(this.props.formSettings.choice0Id){
        var choice0Id = this.props.formSettings.choice0Id;
        hidden0 = (<input type='hidden' name='page[links_to_attributes][][id]' value={choice0Id} />);
      }
      if(this.props.formSettings.choice1Id){
        var choice1Id = this.props.formSettings.choice1Id;
        hidden1 = (<input type='hidden' name='page[links_to_attributes][][id]' value={choice1Id} />);
      }
    }

    // console.log(this.props.defaultFormData);
    // if(this.props.defaultFormData){
    //   console.log("have default");
    // }else{
    //   console.log("no default");
    // }
    // console.log(this.props.defaultFormData != undefined);
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
              <form action={path} onSubmit={this.handleSubmit} className="form" method='post' acceptCharset='UTF-8'>
                <input type='hidden' name='_method' value={method} />
                <input type='hidden' name='utf8' value='✓' />
                <input type='hidden' name='authenticity_token' value={csrfToken} />
                <label>
                  Label:
                  <input type="text" name="page[label]" ref={(input) => this.label = input}/>
                </label>
                <label>
                  Content:
                  <input type="text" name="page[content]" ref={(input) => this.content= input}/>
                </label>
                <label>
                  Question:
                  <input type="text" name="page[question]" ref={(input) => this.question = input} />
                </label>
                {hidden0}
                <label>
                  Choice 1:
                  <input type="text" name="page[links_to_attributes][][choice_text]" ref={(input) => this.choice0 = input} />
                </label>
                {hidden1}
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

export default SubmitForm;

