import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Element } from '../../../helpers/FormControls/FormControls';
import { required, exactLengthCreator, minLengthCreator, onlyNumbers, noLetters, validateEmail } from '../../../helpers/validators';

const Input = Element('input');
const Select = Element('select');
const exactLength10 = exactLengthCreator(10);
const minLength6 = minLengthCreator(6);

const UserForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={ handleSubmit } className="col s12" style={{ marginTop: '15px' }}>
      <h4>NEW USER FORM</h4>
      <div className="row">
        <div className="input-field col s4">
          <Field component={Input} id="name" placeholder="Full name" type="text" name="name" validate={[required]} />
          <label htmlFor="name"></label>
        </div>
        <div className="input-field col s4">
          <Field component={Input} id="email" type="text" name="email" placeholder="Email" validate={[required, validateEmail]} />
          <label htmlFor="email"></label>
        </div>
        <div className="input-field col s4">
          <Field component={Input} id="password" type="text" name="password" placeholder="Password" validate={[required, minLength6]} />
          <label htmlFor="password"></label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s4">
          <Field component={Input} id="phone" type="text" name="phone" placeholder="Phone" validate={[required, noLetters, onlyNumbers, exactLength10]} />
          <label htmlFor="phone"></label>
        </div>
        <div className="input-field col s4">
          <Field component={Select} name="status" className="browser-default" validate={[required]} >
            <option value=''>Choose user's status</option>
            <option value="client">client</option>
            <option value="admin">admin</option>
            <option value="partner">partner</option>
          </Field>
        </div>
        <button className="btn red lighten-2" style={{ float: "right" }}>Confirm</button>
      </div>
    </form>
  )
}

const UserReduxForm = reduxForm({
  form: 'newUserForm'
})(UserForm);

export default UserReduxForm;
