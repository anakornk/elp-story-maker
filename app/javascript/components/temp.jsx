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
    img.addEventListener('click', function(){
        modal.style.display = "block";
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click',function() {
        modal.style.display = "none";
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.label.value + ' ' + this.content.value + ' ' + this.question.value);
    // event.preventDefault();
  }

  render(){
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    // alert(csrfToken)
    return (
      <div>
        <img id="myImg" src="https://www.w3schools.com/howto/img_fjords.jpg" alt="Trolltunga, Norway" width="300" height="200"></img>
        <div id="myModal" className="modal">
          <form action='/stories/8/pages' onSubmit={this.handleSubmit} className="modal-content form" method='post' acceptCharset='UTF-8'>
            <span className="close">&times;</span>
            <input type='hidden' name='_method' value='patch' />
            <input type='hidden' name='utf8' value='✓' />
            <input type='hidden' name='authenticity_token' value={csrfToken} />
            <label>
              Label:
              <input type="text" name="page[label]" ref={(input) => this.label = input} />
            </label>
            <label>
              Content:
              <input type="text" name="page[content]" ref={(input) => this.content= input} />
            </label>
            <label>
              Question:
              <input type="text" name="page[question]" ref={(input) => this.question = input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default App123;
