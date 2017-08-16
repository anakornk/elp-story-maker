import React from 'react'


class ShowFormButton extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var that = this;
    // Get the modal
    var modal = document.getElementById('myModal');

    //add event listener to button, when clicked then show modal
    var showFormButton = document.getElementById(this.props.buttonId);

    showFormButton.addEventListener('click', function(){

        // button-edit class used to check whether is add or edit button
      var copy = Object.assign({},that.props.defaultFormSettings);

        if(this.classList.contains("button-edit")){
          var win = this.parentNode.parentNode.parentNode;
          var buttons = (win.querySelectorAll(".button"));
          //buttons shown are in orded so no need to check for choice_index
          buttons.forEach(function(button,index){
            copy["choice"+index] = button.innerHTML;
            copy["choice"+index + "Id"] = button.classList[1].split("-")[2];
          });

          //change path
          copy["editPageId"] = win.classList[1].split("-")[1];

        }
        that.props.onClick(copy);
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
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default ShowFormButton;

