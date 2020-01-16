import React, { PureComponent } from 'react'
import {connect} from 'react-redux';
import {addSinglePerson} from '../../redux/actions/personActions';

class Add extends PureComponent {
  state = {
    firstname: '',
    lastname: '',
    birthday: '',
    address: '',
    hobbies: '',
    emptyFields: false,
    success: false
  }
  timeOut = null;

  componentWillUnmount() {
    this.setState({emptyFields: false, success: false})
  }

  handleSubmit = async e => {
    e.preventDefault();
    const {firstname, lastname, birthday, address, hobbies} = this.state;
    if(firstname && lastname && birthday && address && hobbies) {
      await this.props.addPerson({...this.state});
      this.setState({emptyFields: false, firstname: '', lastname: '', birthday: '', address: '', hobbies: '', success: true})  
    }else {
      this.setState({emptyFields: true})
    }
    setTimeout(() => {
      this.setState({success: false})
    }, 3000);
    clearTimeout(this.timeOut)
    
  }
  handleCloseX = e => {
    this.setState({emptyFields: false})
  }

  handleOnChange = e => this.setState({[e.target.name] : e.target.value})

  render() {
    const {emptyFields, success, firstname, lastname, birthday, address, hobbies} = this.state;
    return (
      <div className="card mb-3">
      <div className={emptyFields ? "alert alert-danger text-center alert-dismissible" : "d-none"} role="alert">
      <a onClick={this.handleCloseX} style={{cursor: 'pointer'}} className="close" data-dismiss="alert" aria-label="close">&times;</a>
        All field must not be empty!
      </div>
      <div className={success ? "alert alert-success text-center alert-dismissible" : "d-none"} role="alert">
      <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
        Successfuly added!
      </div>
      <div className="card-header"><span className="text-success">Add</span> Person</div>
      <div className="card-body">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Firtname</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter Firtname..." name="firstname" value={firstname} onChange={this.handleOnChange}/>
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
          <input type="submit" value="Save" className="btn btn-success btn-block"/>
        </form>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addPerson: payload => dispatch(addSinglePerson(payload))
});

export default connect(null, mapDispatchToProps)(Add);