import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

export default function NuevoCliente() {
  const [sedes = [], setSedes] = useState();
  const [nombre, setNombre] = useState();
  const [dpi, setDpi] = useState();
  const [nit, setNit] = useState();
  const [direccion, setDireccion] = useState();
  const [sede = 2, setSede] = useState();
  const [state, setState] =useState();


  useEffect(() => {
    validarPermisos();
    axios
      .get(
        
        "http://18.223.121.116:4000/sede/getSedes"
        
      )
      .then((res) => {
        console.log(res.data);
        setSedes(res.data);
      });
  }, []);


  function validarPermisos()
  {
    var usr = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        "http://18.223.121.116:4000/permiso/tienePermiso",
        {
          usuario: usr.ID,
          permiso: 1
        }
      )
      .then((res)=>{
        if(res.data.res == 0){
          alert("No tiene acceso a este modulo\n Adios!");
          setState(1);
        }
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function renderRedirect()
  {
    if(state == 1)
      return <Redirect to='/iniciarSesion' />
  }

  function crearCliente() {
    axios
      .post(
        "http://18.223.121.116:4000/cliente/nuevoCliente",
        {
          DPI: dpi,
          nombre: nombre,
          NIT: nit,
          direccion: direccion,
          sede: sede
        }
      )
      .then((res)=>{
        console.log(res);
        console.log("cliente creado ")
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  const lista2 = sedes.map((element) => {
    {
      return (
        <option value={element.id}>{element.alias}</option>
      );
    }
  });


  return (

    
    <div className="formulario">
      {renderRedirect()}
      <form autoComplete="off">
        <h1 align="center">Nuevo Cliente </h1>
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
            <label for="exampleFormControlSelect1">DPI</label>
            <input type="number"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setDpi(event.target.value)}
          />
          </div>
          <div class="form-group col-6">
            <label for="exampleFormControlSelect2">NIT</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(event) => setNit(event.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Direccion</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setDireccion(event.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Sede</label>
          <select class="form-control" onChange={(event) =>     setSede(event.target.value) }>
                {lista2}
            </select>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => crearCliente()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
