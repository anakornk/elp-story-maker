import React from 'react'

class StoryImageUploadBox extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get the modal
    var modal = document.getElementById('imageBoxModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
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

    var headers = new Headers();
    headers.set('Accept','application/json');
    //headers.set('Content-Type', 'application/json');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    headers.set('X-CSRF-Token',csrfToken)

    var url = 'http://localhost:3000/stories/'+ this.props.id
    var method = "PUT";


    var image = this.image.files[0];
    var formData = new FormData();
    formData.append("story[image]",image);


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
      //console.log(data);
      location.reload();
    })
    .catch(function(error){
      alert("Oops something is wrong:" + error);
    });


  }


  render(){
    var imgUrl = "https://www.baidu.com/img/bd_logo1.png"
    if(this.props.image.url){
      imgUrl = this.props.image.url
    }
    return (
      <div>
        <img id="myImg" src={imgUrl} alt={this.props.title} width="50" height="50" />
        <div id="imageBoxModal" className="modal">
          <span id="close2">&times;</span>
          <div className="modal-content">
            <img id="img01" />
            <form onSubmit={this.handleSubmit}>
              <label>
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
