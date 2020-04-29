import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AgregarRol() {
  const [usuarios = [], setUsuarios] = useState();     
  const [usuario, setUsuario] = useState();
  const [rol, setRol] = useState();

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

  function guardarRol() {
    axios
      .post(
        "http://18.223.121.116:4000/permiso/asignarRol",
        {
            id_usuario: usuario,
            id_rol: rol
        }
      )
      .then((res)=>{
        console.log("rol asignado")
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  const lista = usuarios.map((element) => {
    {
      return (
        <option value={element.ID}>{element.DPI}</option>
      );
    }
  });

  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Asignar Rol </h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Usuario</label>
          <select class="form-control" onChange={(event) =>     setUsuario(event.target.value) }>
                {lista}
            </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Rol</label>
          <select class="form-control" onChange={(event) =>     setRol(event.target.value) }>
            <option value="1">Vendedor</option>
            <option value="2">Bodeguero</option>
            <option value="3">Repartidor</option>
            <option value="4">Administrador</option>
          </select>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => guardarRol()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
