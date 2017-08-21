import React from 'react'

class StoryEditorBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {textValue: this.props.title, selectValue: this.props.category}
    this.handleFocus = this.handleFocus.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleFocus(event){
    this.beforeTextValue = this.state.textValue;
  }

  handleTextChange(event){
      this.setState({textValue: event.target.value});
  }

  handleBlur(event){
    //this.updateTitle(this.state.value);
    this.updateTitle(this.state.textValue);
  }

  handleSelectChange(event){
    this.beforeSelectValue = this.state.selectValue;
    this.setState({selectValue: event.target.value});
    this.updateCategory(event.target.value);
  }

  handleSubmit(event){
    event.preventDefault();
    document.querySelector("#editable-title").blur();
  }

  updateTitle(title){
    var csrfToken = $('meta[name=csrf-token]').attr('content');

    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ this.props.id
    var payload = {authenticity_token: csrfToken,story: {title: title}}
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
      console.log("update title success");
      document.getElementById('storyImg').setAttribute('alt',title);
    })
    .catch(function(error){
      that.setState({textValue:that.beforeTextValue});
      alert("Oops something is wrong:" + error);
    });
  }

  updateCategory(category){
    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ this.props.id
    var payload = {story: {category: category}}
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
      console.log("update category success");
    })
    .catch(function(error){
      that.setState({selectValue:that.beforeSelectValue});
      alert("Oops something is wrong:" + error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.selectValue} onChange={this.handleSelectChange}>
          <option value="young">Young</option>
          <option value="old">Old</option>
        </select>
        <input type="text" id="editable-title" value={this.state.textValue} onFocus={this.handleFocus} onChange={this.handleTextChange} onBlur={this.handleBlur}/>
      </form>
    );
  }
}
export default StoryEditorBar
