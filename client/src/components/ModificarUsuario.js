import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ModificarUsuario() {
  const [usuarios = [], setUsuarios] = useState();
  const [nombre, setNombre] = useState();
  const [correo, setCorreo] = useState();
  const [id, setId] = useState();
  const [dpi, setDpi] = useState();
  const [fecha, setFecha] = useState();
  const [clave, setClave] = useState();

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

  function modificarUsuario() {
    axios
      .post(
        "http://18.223.121.116:4000/usuario/modificarDatos",
        {
          ID: id,
          DPI: dpi,
          nombre: nombre,
          fecha_nacimiento: fecha,
          correo: correo,
          password: clave
        }
      )
      .then((res)=>{
        console.log("user modificado")
      })
      .catch((error)=>{
        console.log(error);
      });
    }

const lista = usuarios.map((element) => {
    {
      return (
        <option value={element.ID+","+element.DPI}>{element.DPI}</option>
      );
    }
  });

  return (
    <div className="formulario">
    <form autoComplete="off">
      <h1 align="center">Modificar Usuario </h1>
      <h3>Seleccionar Usuario</h3>
      <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  { 
                                      var bytes = event.target.value.split(",");
                                      console.log("ID"+bytes[0]);
                                      console.log("DPI"+bytes[1]);
                                      setId(bytes[0]);
                                      setDpi(bytes[1]);
            }}
            >
                {lista}
      </select>
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
    <button className="btn-primary" onClick={() => modificarUsuario()}>
      {" "}
      Crear
    </button>
  </div>
  );
}
