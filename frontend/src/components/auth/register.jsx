import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

const Register = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [field, setField] = useState(false);

  const toggle = () => {setModal(!modal); setField(false)}; 

  const handleSubmit = e => {
    e.preventDefault();
    if(!name || !password || !email) {
      setField(true)
    }else {
      setField(false)
    }
  }

  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        
        <ModalBody>
        <Alert color="danger text-center" className={field ? null : "d-none"} >
          All fields must be filled out!
        </Alert>
        <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter Name..." name="name" value={name}
            onChange={e => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control form-control-lg" placeholder="Enter Email..." name="email" 
             value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="Enter Password..." name="password" 
             value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          {/* <input type="submit" value="Save" className="btn btn-success btn-block"/> */}
        </form>
      </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Register;
