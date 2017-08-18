import React from 'react'


class ShowFormButton extends React.Component {
  constructor(props){
    super(props);
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
          var block = this.closest('.block')
          var buttons = (block.querySelectorAll(".button"));
          //buttons shown are in orded so no need to check for choice_index
          buttons.forEach(function(button,index){
            copy["choice"+index] = button.innerHTML;
            copy["choice"+index + "Id"] = button.getAttribute("data-linkid");
          });
        }
        that.props.onClick(copy);
        modal.style.display = "block";
    });

    // Get the <span> element that closes the modal
    var span = document.getElementById("close1");

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click',function() {
        modal.style.display = "none";
    });
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

