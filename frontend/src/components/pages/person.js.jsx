import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteSinglePerson} from '../../redux/actions/personActions';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import Moment from 'react-moment';

class Person extends PureComponent{
  state = {
    showInfo: false,
    success: false
  }

  handleClick = () => {
    this.setState({showInfo: !this.state.showInfo})
  }

  handleDel = async id => {
    this.setState({success: true})
    await this.props.deletePerson({id});

  }
  
  render() {
    const {info, firstname, lastname, id} = this.props;
    const {showInfo, success} = this.state;
    
    return (
      <React.Fragment>
        {/* <div className={success ? "alert alert-success text-center alert-dismissible" : "d-none"} role="alert">
          <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {lastname} Successfuly Deleted!
        </div> */}
        <div className="card card-body mb-3">
          <h4>
            {firstname}{" "} {lastname} {" "} 
            <i className="fas fa-caret-down" style={{ cursor: 'pointer'}} onClick={this.handleClick}/>
            <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}} id={`PopoverLegacy${id}`}></i>
            <Link to={`edit/${id}`}>
              <i className="fas fa-pencil-alt" style={{cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem'}}></i>
            </Link>
          </h4>
          {showInfo ?
              [info].map((item, key) => (
            <ul className="list-group" key={item._id}>
            {/* <li className="list-group-item">Firstname: {item.firstName} </li> */}
              {/* <li className="list-group-item">Lastname: {item.lastName} </li> */}
              <li className="list-group-item">Birthday: <Moment format="LL" date={new Date(item.birthday)}/></li>
              <li className="list-group-item">Address: {item.address} </li>
              <li className="list-group-item">Hobbies: {item.hobbies.join(", ")}</li>
            </ul>
              ))
          : null}
        </div>
        <UncontrolledPopover trigger="legacy" placement="left" target={`PopoverLegacy${id}`}>
            <PopoverHeader className="text-center">Warning</PopoverHeader>
            <PopoverBody className="text-center">
              Are you sure you want to delete this Person ?
            </PopoverBody>
            <Button className="mb-2 d-block mx-auto bg-danger border-danger" onClick={this.handleDel.bind(this, id)}>Confirm</Button>
          </UncontrolledPopover>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deletePerson: payload => dispatch(deleteSinglePerson(payload))
});

export default connect(null,mapDispatchToProps)(Person);