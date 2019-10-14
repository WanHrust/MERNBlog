import React, {useState} from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
}
    from 'reactstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from './Alert';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth'; 

const RegisterComponent = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: ''
    })

    const {name, email, password} = formData;

    const onSubmit = e => {
        e.preventDefault();
        props.register({name, email, password});
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    if(props.isAuthenticated){
      return <Redirect to="/"/>
    }

    return (
        <div>
            <Form onSubmit={e => onSubmit(e)}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  value={name}
                  onChange={e => onChange(e)}
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  value={email}
                  onChange={e => onChange(e)}
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  value={password}
                  onChange={e => onChange(e)}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
            <Alert></Alert>
        </div>
    );
}
RegisterComponent.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(RegisterComponent);
