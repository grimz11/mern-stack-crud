import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {getSinglePerson, updateSinglePerson} from '../../redux/actions/personActions';
import moment from "moment";

class Edit extends PureComponent {
  state = {
    firstname: '',
    lastname: '',
    birthday: '',
    address: '',
    hobbies: '',
    id: '',
  }

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    await this.props.getPerson({id});
    
    if(this.props.fetchPerson !== undefined) {
      const {_id, firstName, lastName, birthday, address, hobbies} = this.props.fetchPerson;
      const formattedDate = moment(birthday).format("YYYY-MM-DD");
      this.setState({id: _id,firstname: firstName, lastname: lastName, birthday: formattedDate, address: address, hobbies: hobbies})
    }
  }

  handleOnChange = e => this.setState({[e.target.name] : e.target.value});

  handleSubmit = async (id, e) => {
    e.preventDefault();
    const {address, birthday, firstname, lastname, hobbies} = this.state;
    await this.props.updatePerson({id, address, birthday, firstname, lastname, hobbies});
    this.props.history.push('/');
  }
  
  render() {
    const {id, address, birthday, firstname, lastname, hobbies} = this.state;
    
    return (
      <div className="card mb-3">
      <div className="card-header"><span className="text-success">Edit</span> Person</div>
      <div className="card-body">
        <form onSubmit={this.handleSubmit.bind(this, id)}>
          <div className="form-group">
            <label htmlFor="firstname">Firtname</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter Firtname..." name="firstname" 
            value={firstname} onChange={this.handleOnChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter Lastname..." name="lastname" 
            value={lastname} onChange={this.handleOnChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input type="date" className="form-control form-control-lg" placeholder="Enter Birthday..." name="birthday" 
            value={birthday} onChange={this.handleOnChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter Address..." name="address" 
            value={address} onChange={this.handleOnChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter Hobbies..." name="hobbies" 
            value={hobbies} onChange={this.handleOnChange}/>
          </div>
          <input type="submit" value="Update" className="btn btn-success btn-block"/>
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchPerson: state.rootPersons.person
});

const mapDispatchToProps = dispatch => ({
  getPerson: payload => dispatch(getSinglePerson(payload)),
  updatePerson: payload => dispatch(updateSinglePerson(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);