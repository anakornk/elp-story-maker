import React from 'react';

class App123 extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
    var captionText = document.getElementById("caption");
    img.addEventListener('click', function(){
        modal.style.display = "block";
        captionText.innerHTML = this.alt;
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click',function() {
        modal.style.display = "none";
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <img id="myImg" src="https://www.w3schools.com/howto/img_fjords.jpg" alt="Trolltunga, Norway" width="300" height="200"></img>
        <div id="myModal" className="modal">
          <form onSubmit={this.handleSubmit} className="modal-content form">
            <span className="close">&times;</span>
            <label>
              Name:
              <input type="text" ref={(input) => this.input = input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default App123;
