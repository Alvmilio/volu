import React, { useState } from "react";
import axios from "axios";

export default function NuevoPaciente() {
  const [nombre, setNombre] = useState();
  const [correo, setCorreo] = useState();
  const [dpi, setDpi] = useState();
  const [fecha, setFecha] = useState();
  const [clave, setClave] = useState();

  function crearUsuario() {
    axios
      .post(
        "http://18.223.121.116:4000/usuario/nuevoUsuario",
        {
          DPI: dpi,
          nombre: nombre,
          fecha_nacimiento: fecha,
          correo: correo,
          password: clave
        }
      )
      .then((res)=>{
        console.log("user creado ")
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Nuevo Usuario </h1>
        <h2>Datos Personales</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">Nombre Completo</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>

        <div className="row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Correo Electronico</label>
            <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setCorreo(event.target.value)}
          />
          </div>
          <div class="form-group col-6">
            <label for="exampleFormControlSelect2">DPI</label>
            <input
              type="Number"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(event) => setDpi(event.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Fecha de Nacimiento</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="29/04/1997"
            onChange={(event) => setFecha(event.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlTextarea1"
            onChange={(event) => setClave(event.target.value)}
          ></input>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => crearUsuario()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
