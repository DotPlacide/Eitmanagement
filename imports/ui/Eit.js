import React, { Component } from 'react';
import { Eits } from '../api/eits.js';

export let selected = []

// Task component - represents a single todo item
export default class Eit extends Component {

  constructor(props) {
    super(props);
    this.state = {name: null, surname: null, country : null, age : null, editMode: false, checked : []};
  }

  onType = (event)=>{
    let field = {[event.target.name] : event.target.value.trim()}
    this.setState(field)
  }

  toggleChecked = () => {
    var i = selected.findIndex(id => id==this.props.eit._id)

    if (i === -1){
      selected.push(this.props.eit._id)
      this.setState({
        checked : selected
      })
    }else{
      selected = selected.filter(function(id, index, arr){
        return index !==  i;
      })
      this.setState({
        checked : selected
      })
    }

  }

  updateEIT = (event) => {

    const name = this.state.name
    const surname = this.state.surname
    const age = this.state.age
    const country = this.state.country

    if(!name || !surname || !country || !age){
      event.preventDefault();
      alert("All fields are mandatory!")
    }else{
      Eits.update(this.props.eit._id, {
        $set: {
          'name' : name,
          'surname': surname,
          'age': age,
          'country': country
        },
      });
    }

  }

  setMode = ()=>{
    if(this.state.editMode){
      this.setState({editMode: false})
    }else{
      this.setState({editMode: true, name: this.props.eit.name, surname: this.props.eit.surname, age: this.props.eit.age, country: this.props.eit.country})
    }
  }

  deleteEIT = ()=>{
      Eits.remove(this.props.eit._id);
  }

  details = {width: '60%', margin: 15,
  padding: 10, border: '1px solid #cfcfcf'};

  render() {

    let eitDetails;
    if(this.state.editMode){
      eitDetails= <form onSubmit={event => this.updateEIT(event)} style={this.details}>
         <br></br>
          <input className="form-control" type="text" name="name" placeholder="name" defaultValue={this.props.eit.name} onChange={event => this.onType(event)}/> &emsp;
          <input className="form-control" type="text" name="surname" placeholder="surname" defaultValue={this.props.eit.surname} onChange={event => this.onType(event)}/> <br/><br/>
          <input className="form-control" type="text" name="age" placeholder="age" defaultValue={this.props.eit.age} onChange={event => this.onType(event)}/> &emsp;
          <input className="form-control" type="text" name="country" placeholder="country" defaultValue={this.props.eit.country} onChange={event => this.onType(event)}/> <br/><br/>
          <button className="btn btn-success">Save Changes</button>&nbsp;
          <button className="btn btn-secondary" onClick={this.setMode}>Dismiss</button><br/><br/>
        </form>
    }else{
      eitDetails= <div><table style={this.details}>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" ref="check" onClick={this.toggleChecked.bind(this)} />
              {this.props.eit.name} {this.props.eit.surname}, {this.props.eit.age} ({this.props.eit.country})
            </td>
            <td>
              <button className="btn btn-danger btn-sm" style={{float:'right', margin: 5}} onClick={this.deleteEIT}>delete</button>
              <button className="btn btn-primary btn-sm" style={{float:'right', margin: 5}} onClick={this.setMode}>edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    }

    return (
      <div>
        {eitDetails}
      </div>
    );

  }

}
