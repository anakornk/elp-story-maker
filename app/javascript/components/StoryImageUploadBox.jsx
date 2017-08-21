import React from 'react'

class StoryImageUploadBox extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {imageUrl: props.image.url};
  }

  componentDidMount() {
    // Get the modal
    var modal = document.getElementById('imageBoxModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('storyImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.addEventListener('click',function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });

    // Get the <span> element that closes the modal
    var span = document.getElementById("close2");

    // When the user clicks on <span> (x), close the modal

    span.addEventListener('click',function() {
        modal.style.display = "none";
    });
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

    var url = '/stories/'+ this.props.id
    var method = "PUT";


    var image = this.image.files[0];
    var formData = new FormData();
    formData.append("story[image]",image);

    var that = this;

    var fetchOptions = {
      method: method,
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
      var modal = document.getElementById('imageBoxModal');
      modal.style.display = "none";
      // console.log(data);
      //location.reload();
      if(data.status == "success"){
        that.setState({imageUrl: data.story.image.url});
      }else{
        alert(data.message);
      }
      ajaxLoader.style.display = "none";
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
      ajaxLoader.style.display = "none";
    });


  }


  render(){
    var imgUrl = "https://www.baidu.com/img/bd_logo1.png"
    if(this.state.imageUrl){
      imgUrl = this.state.imageUrl;
    }
    return (
      <div>
        <img id="storyImg" src={imgUrl} alt={this.props.title} width="50" height="50" />
        <div id="imageBoxModal" className="modal">
          <div className="modal-content flex-vertical">
            <span id="close2">&times;</span>
            <img id="img01" width="300px" height="300px"/>
            <form onSubmit={this.handleSubmit} className="form-popup">
              <label>
                Upload new image:
                <input type="file" ref={(input) => this.image = input}  />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div id="caption"></div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

export default StoryImageUploadBox;
