import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NuevaSede() {
  const [usuarios = [], setUsuarios] = useState();
  const [alias, setAlias] = useState();
  const [direccion, setDireccion] = useState();
  const [departamento, setDepartamento] = useState();
  const [municipio, setMunicipio] = useState();
  const [encargado, setEncargado] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/usuario/getUsuarios"
        
      )
      .then((res) => {
        console.log(res.data);
        setUsuarios(res.data);
      });
  }, []);


  function crearSede() {
    axios
      .post(
        "http://18.223.121.116:4000/sede/nuevaSede",
        {
          alias:alias,
          direccion:direccion+", "+departamento,
          municipio:municipio,
          departamento:departamento,
          encargado:encargado  
        
        }
      )
      .then((res)=>{
        console.log("sede creada")
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
          <select class="form-control" id="exampleFormControlSelect1" onChange={(event) =>  setEncargado(event.target.value)}>
                {lista}
          </select>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => crearSede()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
