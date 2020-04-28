import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NuevaBodega() {
  const [sedes = [], setSedes] = useState();
  const [sede = 1, setSede] = useState();


  useEffect(() => {
    getSedes();
    ///Codigo para validaciones de usuario
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

  function eliminarSede() {
    
    axios
      .post(
        "http://18.223.121.116:4000/sede/eliminarSede",
        {
            id:sede
        }
      )
      .then((res)=>{
        console.log(res);
        console.log("sede eliminada")
      })
      .catch((error)=>{
        console.log(error);
      });
  }


  const lista = sedes.map((element) => {
    {
      return (
        <option value={element.id}>{element.alias}</option>
      );
    }
  });

  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Eliminar Sede </h1>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Sede</label>
          <select class="form-control" onChange={(event) =>     setSede(event.target.value) }>
                {lista}
            </select>
        </div>
        
      </form>
      <div class="text-center">
      <button className="btn-primary" onClick={() => eliminarSede()}>
        {" "}
        Crear
      </button>
      </div>
    </div>
  );
}
