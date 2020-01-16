import React, { PureComponent } from 'react'
import Person from './person.js';
import {connect} from 'react-redux';
import {getAllPerson} from '../../redux/actions/personActions';

class Home extends PureComponent {
  state = {
    persons: []
  }
  componentDidMount () {
    this.props.getAllPerson();
     
  }

  render() {
    const {fetchAllPerson} = this.props;

    return (
      <React.Fragment>
        <h1 className="display-4 mb-3"><span className="text-success">All</span> List</h1>
        {fetchAllPerson.map(person => <Person key={person._id} info={person} firstname={person.firstName} lastname={person.lastName} id={person._id}/>)}
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  fetchAllPerson: state.rootPersons.persons
});

const mapDispatchToProps = dispatch => ({
  getAllPerson: () => dispatch(getAllPerson())
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);