import React, { useState } from "react";
import axios from "axios";

export default function NuevaSede() {
  const [alias, setAlias] = useState();
  const [direccion, setDireccion] = useState();
  const [departamento, setDepartamento] = useState();
  const [municipio, setMunicipio] = useState();
  const [encargado, setEncargado] = useState();

  function crearProducto() {
    axios
      .post(
        "http://18.223.121.116:4000/usuario/nuevoUsuario",
        {
            /*
          DPI: dpi,
          nombre: nombre,
          fecha_nacimiento: fecha,
          correo: correo,
          password: clave*/
        }
      )
      .then((res)=>{
        console.log("sede creada")
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Nueva Sede </h1>
        <h2>Datos Sede</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">Alias</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setAlias(event.target.value)}
          />
        </div>

        <div className="row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Direccion</label>
            <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setDireccion(event.target.value)}
          />
          </div>
          <div class="form-group col-6">
            <label for="exampleFormControlSelect2">Departamento</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(event) => setDepartamento(event.target.value)}
            />
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Municipio</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setMunicipio(event.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Encargado</label>
          <input
            class="form-control"
            id="exampleFormControlTextarea1"
            onChange={(event) => setEncargado(event.target.value)}
          ></input>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => crearProducto()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
