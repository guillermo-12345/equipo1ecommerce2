import React, { useState } from 'react';

export const Contact =()=>{
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('LastName:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);
    
    alert('Hola ' + name+' '+lastName + ', gracias por ponerte en contacto con nosotros. A la brevedad te estaremos respondiendo.');

     

  }

  return (
<form className="row m-xxl-5 p-xxl-5 g-3" onSubmit={handleSubmit}>
  <div className="col-md-4">
    <label for="validationServer01" className="form-label">Nombre</label>
    <input type="text" className="form-control shadow" id="validationServer01" placeholder="Juan" required value={name} onChange={(e) => setName(e.target.value)}/>
    <div className="valid-feedback">
      ✅
    </div>
  </div>
  <div className="col-md-4">
    <label for="validationServer02" className="form-label">Apellido</label>
    <input type="text" className="form-control shadow " id="validationServer02" placeholder="Perez" required  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
    <div className="valid-feedback">
    ✅
    </div>
  </div>
  <div className="col-md-4">
    <label for="validationCustomUsername" className="form-label">Correo Electornico</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input type="text" className="form-control shadow" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required onChange={(e) => setEmail(e.target.value)} />
      <div className="invalid-feedback">
        ❎Correo Electornico Incorrecto.
      </div>
    </div>
  </div>
  <div className="mb-3">
    <label for="validationTextarea" className="form-label">Mensaje</label>
    <textarea className="form-control m-xxl-auto w-50 justify-content-center shadow"  id="validationTextarea" placeholder="Required example textarea"  required onChange={(e) => setMessage(e.target.value)} />
    <div className="invalid-feedback">
      ...Mensaje
    </div>
  </div>
  <div className="col-2 mx-5 ">
    <div className="form-check">
      <input className="form-check-input  shadow" type="checkbox" value=""  aria-describedby="" required></input>
      <label className="form-check-label fw-lighter" for="">
        Aceptar Terminos y Condiciones
      </label>
      <div id="invalidCheck3Feedback" className="invalid-feedback">

      </div>
    </div>
  </div>
  <div className="col-11">
    <button className="btn btn-primary" type="submit">Aceptar</button>
  </div>
</form>
  );
}
