import React from 'react'

class PublishButton extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeStoryStatus = this.changeStoryStatus.bind(this);
    // console.log(this.props.published)
    this.state = {published: this.props.published}
    // console.log(this.state.published);
  }

  handleClick(e){
    this.changeStoryStatus();
  }

  changeStoryStatus(){
    var headers = new Headers();
    headers.set('Accept','application/json');
    headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var that = this;
    var url = '/stories/'+ this.props.id
    var payload = {story: { published: !this.state.published}}
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
      // console.log(data);
      // console.log("update publish");
      console.log(data);
      that.setState({published: data.published})
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });
  }

  render(){
    var buttonText = this.state.published ? "Unpublish" : "Publish"

    return(
      <button onClick={this.handleClick} className='btn btn-info text-center'>{buttonText}</button>
    );
  }
}


export default PublishButton;
