import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NuevaBodega() {
  const [sedes = [], setSedes] = useState();
  const [usuarios = [], setUsuarios] = useState();
  const [nombre, setNombre] = useState();
  const [direccion, setDireccion] = useState();
  const [estado, setEstado] = useState();
  const [encargado, setEncargado] = useState();
  const [sede, setSede] = useState();

  useEffect(() => {
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

  function validateValue(from, val)
  {
      console.log("Recibo de "+from+" -> "+val);
  }
  
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

  function crearBodega() {
    /*
    setEstado(1);
    setEncargado(3);
    setSede(2);*/
    axios
      .post(
        "http://18.223.121.116:4000/bodega/nuevaBodega",
        {
          estado: estado,
          encargado: encargado,
          sede: sede,
          nombre: nombre,
          direccion: direccion
          
        }
        
      )
      .then((res)=>{
        console.log(res);
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

  const lista2 = sedes.map((element) => {
    {
      return (
        <option value={element.id}>{element.alias}</option>
      );
    }
  });

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
                {lista}
            </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Sede</label>
          <select class="form-control" onChange={(event) =>     setSede(event.target.value) }>
                {lista2}
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
