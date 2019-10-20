import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Eits } from '../api/eits.js';
import Eit, { selected } from './Eit.js';

// App component - represents the whole app

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {name: null, surname: null, country : null, editMode: false, button1Txt: "Add New EIT", button2Txt: "Delete All"};
  }

  renderEITs() {
    return this.props.eits.map((eit) => (

      <Eit key={eit._id} eit={eit} />

    ));

  }

  add = ()=>{
    this.state.button1Txt == "Add New EIT" ? this.setState({editMode: true, button1Txt: "EIT List", button2Txt: "Reset Form"}) : this.setState({editMode: false, button1Txt: "Add New EIT", button2Txt: "Delete ALL"})
  }

  deleteAll = () => {
    this.props.eits.map((x)=>{
      return Eits.remove(x._id);
    })
  }

  submitDetails = (event)=>{

    event.preventDefault();

    // Find the text field inputs via the React ref
    const name = this.state.name
    const surname = this.state.surname
    const age = this.state.age
    const country = this.state.country

    if(!name || !surname || !country){
      alert("Please fill in all form fields!")
    }
    else
    {
      Eits.insert({
        name,
        surname,
        age,
        country,
        createdAt: new Date(), // current time
        })
      this.add();
    }
  }

  onType = (event)=>{
    let field = {[event.target.name] : event.target.value.trim()}
    this.setState(field)
  }

  delSel = () => {
    if(selected.length > 0){
      selected.map((x)=>{
        return Eits.remove(x);
      })
    }else{
      alert("Select atleast one EIT to delete!")
    }
  }

  render() {

    let content;

    if(this.state.editMode){
       content= <form onSubmit={this.submitDetails.bind(this)}>
         <br></br>
          <input className="form-control col-md-4" type="text" name="name" placeholder="name" onChange={event => this.onType(event)}/><br/><br/>
          <input className="form-control col-md-4" type="text" name="surname" placeholder="surname" onChange={event => this.onType(event)}/><br/><br/>
          <input className="form-control col-md-4" type="text" name="age" placeholder="age" onChange={event => this.onType(event)}/><br/><br/>
          <input className="form-control col-md-4" type="text" name="country" placeholder="country" onChange={event => this.onType(event)}/><br/><br/>
          <button className="btn icon-btn btn-success">Add EIT</button>
        </form>
    }else{
      content= <div>
        {this.renderEITs()}
      </div>
    }

    return (
      <div className="container">

        <header>

          <h1>EIT CLASS OF 2020 List</h1>
          <p>You can add the new EIT from <a href="meltwater.org">MEST</a> in this plateform , for manage them better</p>
          <button className="btn icon-btn btn-info" onClick={this.add}>{this.state.button1Txt}</button>
          &emsp;
          <button className="btn icon-btn btn-warning" onClick={this.deleteAll}>{this.state.button2Txt}</button>
          &emsp;
          <button className="btn icon-btn btn-danger" onClick={this.delSel}>Delete Selected</button>

        </header>

        {content}

      </div>

    );
  }

}

export default withTracker(() => {

  return {

    eits: Eits.find({}).fetch(),

  };

})(App);
