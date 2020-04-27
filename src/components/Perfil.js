import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Perfil() {
  const [permisos = [], setPermisos] = useState();


  useEffect(() => {

    var usr = JSON.parse(localStorage.getItem('user'));
 
    axios
      .get(
        
        "http://18.223.121.116:4000/permiso/permisosUsuario",
        {
            id_usuario: usr.ID
        }
        
      )
      .then((res) => {
        console.log(res.data);
        setPermisos(res.data);
      });
  }, []);

const usr = JSON.parse(localStorage.getItem('user'));
  
/*
const lista = permisos.map((element) => {
    {
      return (
        <option value={element.id_permiso}>{element.permiso}</option>
      );
    }
  });*/

  return (
    <div className="formulario">
    <form autoComplete="off">
      <h1 align="center">Mi Perfil </h1>
      
      <div class="form-group">
        <label for="exampleFormControlInput1">Nombre</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          value={usr.nombre}
          disabled="true"
        />
      </div>
      <div className="row">
        <div class="form-group col-6">
          <label for="exampleFormControlSelect1">Correo Electronico</label>
          <input
          class="form-control"
          id="exampleFormControlInput1"
          value={usr.correo}
          disabled="true"
        />
        </div>
        <div class="form-group col-6">
          <label for="exampleFormControlSelect2">DPI</label>
          <input
            type="Number"
            class="form-control"
            id="exampleFormControlInput1"
            value={usr.DPI}
            disabled="true"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect2">Fecha de Nacimiento</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="29/04/1997"
          value={usr.fecha_nacimiento}
          disabled="true"
        />
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlTextarea1"
          value={usr.password}
          disabled="true"
        ></input>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Permisos</label>
        <select
              class="form-control"
              id="exampleFormControlSelect1"
              disabled="true"
            >
                
      </select>
      </div>
      
    </form>

  </div>
  );
}
