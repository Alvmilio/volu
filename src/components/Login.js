import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [correo, setCorreo] = useState();
  const [clave, setClave] = useState();

  function loginAttempt() {
    axios
      .post(
        "http://18.223.121.116:4000/usuario/login",
        {
            correo: correo,
            password: clave
        }
      )
      .then((res)=>{
        if(res.data.length == 0)
            alert("Credenciales incorrectos!\nPorfavor intente otra vez.");
        
        else{    
            
            console.log("Guardar variable de sesion")
            console.log(res.data[0]);
            localStorage.setItem('user',JSON.stringify(res.data[0]));
            console.log(localStorage.getItem('user'));
            var usr = JSON.parse(localStorage.getItem('user'));
            console.log(usr);
        }
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Iniciar Sesión </h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Correo</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setCorreo(event.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setClave(event.target.value)}
          />
        </div>
      </form>
      <button className="btn-primary" onClick={() => loginAttempt()}>
        {" "}
        Login
      </button>
    </div>
  );
}
