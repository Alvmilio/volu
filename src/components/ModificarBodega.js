import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ModificarBodega() {
  const [bodegas = [], setBodegas] = useState();
  const [sedes = [], setSedes] = useState();
  const [usuarios = [], setUsuarios] = useState();
  const [bodega = 1, setBodega] = useState();
  const [nombre , setNombre] = useState();
  const [direccion, setDireccion] = useState();
  const [estado = 1, setEstado] = useState();
  const [encargado = 3, setEncargado] = useState();
  const [sede = 3, setSede] = useState();

  useEffect(() => {
    getSedes();
    getBodegas();
    axios
      .get(
        
        "http://18.223.121.116:4000/usuario/getUsuarios"
        
      )
      .then((res) => {
        console.log(res.data);
        setUsuarios(res.data);
      });
  }, []);

  function getBodegas()
  {
    axios
      .get(
        "http://18.223.121.116:4000/bodega/getBodegas",
      )
      .then((res)=>{
        setBodegas(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
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

  function modificarBodega() {
    axios
      .post(
        "http://18.223.121.116:4000/bodega/modificarBodega",
        {
            id:bodega,
            nombre:nombre,
            direccion:direccion,
            estado:estado,
            encargado:encargado,
            sede:sede
        }
      )
      .then((res)=>{
        console.log("Bodega modificada")
      })
      .catch((error)=>{
        console.log(error);
      });
    }

const listaBodegas = bodegas.map((element) => {
    {
      return (
        <option value={element.ID}>{element.nombre+" - "+element.direccion}</option>
      );
    }
  });
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


  return (
    <div className="formulario">
    <form autoComplete="off">
      <h1 align="center">Modificar Bodega</h1>
      <h3>Seleccionar Bodega</h3>
      <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setBodega(event.target.value)}
            >
                {listaBodegas}
      </select>
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
        <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setEncargado(event.target.value)}
            >
                {lista}
      </select>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Sede</label>
        <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setSede(event.target.value)}
            >
                {listaSedes}
      </select>
      </div>

      
    </form>
    <button className="btn-primary" onClick={() => modificarBodega()}>
      {" "}
      Modificar
    </button>
  </div>
  );
}
