import React, { useEffect, useState } from "react";
import {Redirect } from 'react-router-dom';
import axios from "axios";

export default function ModificarSede() {
  const [sedes = [], setSedes] = useState();
  const [usuarios = [], setUsuarios] = useState();
  const [nombre , setNombre] = useState();
  const [direccion, setDireccion] = useState();
  const [departamento, setDepa] = useState();
  const [municipio, setMuni] = useState();
  const [encargado = 3, setEncargado] = useState();
  const [sede = 3, setSede] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    validarPermisos();
    getSedes();
    axios
      .get(
        
        "http://18.223.121.116:4000/usuario/getUsuarios"
        
      )
      .then((res) => {
        console.log(res.data);
        setUsuarios(res.data);
      });
  }, []);

  function getSedes()
  {
    axios
      .get(
        "http://18.223.121.116:4000/sede/getSedes",
      )
      .then((res)=>{
        setSedes(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function modificarSede() {
    axios
      .post(
        "http://18.223.121.116:4000/sede/modificarSede",
        {
            id:sede,
            alias:nombre,
            direccion:direccion+", "+departamento,
            municipio: municipio,
            encargado:encargado
        }
      )
      .then((res)=>{
        console.log("Sede modificada")
      })
      .catch((error)=>{
        console.log(error);
      });
    }


  const lista = usuarios.map((element) => {
    {
      return (
        <option value={element.ID}>{element.DPI+" - "+element.nombre}</option>
      );
    }
  });

  const listaSedes = sedes.map((element) => {
    {
      return (
        <option value={element.id}>{element.alias}</option>
      );
    }
  });

  function validarPermisos()
  {
    var usr = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        "http://18.223.121.116:4000/permiso/tienePermiso",
        {
          usuario: usr.ID,
          permiso: 10
        }
      )
      .then((res)=>{
        console.log(res);
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


  return (
    <div className="formulario">
      {renderRedirect()}
    <form autoComplete="off">
      <h1 align="center">Modificar Sede</h1>
      <h3>Seleccionar Sede</h3>
      <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setSede(event.target.value)}
            >
                {listaSedes}
      </select>
      <div class="form-group">
        <label for="exampleFormControlInput1">Alias</label>
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
          <label for="exampleFormControlSelect2">Departamento</label>
          <input
          class="form-control"
          id="exampleFormControlInput1"
          onChange={(event) => setDepa(event.target.value)}
        />
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Municipio</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          onChange={(event) => setMuni(event.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Encargado</label>
        <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setEncargado(event.target.value)}
            >
                {lista}
      </select>
      </div>

     

      
    </form>
    <button className="btn-primary" onClick={() => modificarSede()}>
      {" "}
      Modificar
    </button>
  </div>
  );
}
