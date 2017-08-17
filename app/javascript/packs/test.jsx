import React from 'react';
import ReactDOM from 'react-dom';
import {FormFor,Submit} from 'react-rails-form-helpers';
class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <FormFor url="/orders/1" method="put" name="order">
        <Submit name="commit" value="Update order" />
      </FormFor>
    );
  }
}
var g = document.createElement('div');
 g.setAttribute("id", "cont")

ReactDOM.render(<App/>,  document.body.appendChild(g));
