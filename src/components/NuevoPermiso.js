import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NuevoPermiso() {
  const [usuarios = [], setUsuarios] = useState();     
  const [usuario, setUsuario] = useState();
  const [permiso, setPermiso] = useState();

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

  function guardarPermiso() {
    axios
      .post(
        "http://18.223.121.116:4000/permiso/asignarPermiso",
        {
            id_usuario: usuario,
            id_permiso: permiso
        }
      )
      .then((res)=>{
        console.log("permiso asignado")
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
        <h1 align="center">Nuevo Permiso </h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Usuario</label>
          <select class="form-control" onChange={(event) =>     setUsuario(event.target.value) }>
                {lista}
            </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Permiso</label>
          <select class="form-control" onChange={(event) =>     setPermiso(event.target.value) }>
            <option value="1">Registrar Clientes</option>
            <option value="2">Registrar Ventas</option>
            <option value="3">Visualizar Reporte de Ventas</option>
            <option value="4">Actualizar Inventario</option>
            <option value="5">Solicitar Transferencia</option>
            <option value="6">Visualizar/Aceptar ordenes de transferencias externas</option>
            <option value="7">Visualizar/Aceptar ordenes de transferencias internas</option>
            <option value="8">Ordenes de Venta</option>
            <option value="9">Ordenes de Transferencia</option>
            <option value="10">Administrar Sedes</option>
          </select>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => guardarPermiso()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
