import React from 'react';

function EditingForm({ editingUser, editHandler, saveUpdatesHandler }) { 
   
    return (
      <>
        <td><input value={ editingUser.name } name="name" onChange={ editHandler }/></td>
        <td><input value={ editingUser.created_at } disabled /></td>
        <td><input value={ editingUser.updated_at } disabled /></td>
        <td><input value={ editingUser.email } name="email" onChange={ editHandler } /></td>
        <td><input value={ editingUser.password } name="password" onChange={ editHandler } /></td>
        <td><input value={ editingUser.phone } name="phone" onChange={ editHandler } /></td>
        <td>
          <select name="status" className="browser-default" onChange={ editHandler }>
            <option value={ editingUser.status }>Choose user's status</option>
            <option value="client">client</option>
            <option value="admin">admin</option>
            <option value="partner">partner</option>
          </select>
        </td> 
        <td>
          <button className="btn green" onClick={() => { saveUpdatesHandler( editingUser ) }}>Save</button>
          <button className="btn disabled">Remove</button>
        </td>
      </>
    )
}

export default EditingForm;
