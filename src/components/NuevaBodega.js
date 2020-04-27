import React, { useState } from "react";
import axios from "axios";

export default function NuevaBodega() {
  const [nombre, setNombre] = useState();
  const [direccion, setDireccion] = useState();
  const [estado, setEstado] = useState();
  const [encargado, setEncargado] = useState();
  const [sede, setSede] = useState();

  function crearBodega() {
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
        <h1 align="center">Nueva Bodega </h1>
        <h2>Datos Bodega</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">Nombre</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setNombre(event.target.value)}
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
            <label for="exampleFormControlSelect2">Estado</label>
            <select class="form-control" onChange={(event) =>     setEstado(event.target.value) }>
                <option value="1">Activa</option>
                <option value="0">Inactiva</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Encargado</label>
          <select class="form-control" onChange={(event) =>     setEncargado(event.target.value) }>
                
            </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Sede</label>
          <select class="form-control" onChange={(event) =>     setSede(event.target.value) }>
                
            </select>
        </div>
        
      </form>
      <button className="btn-primary" onClick={() => crearBodega()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
