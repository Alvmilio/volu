import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NuevoPermiso() {
  const [usuarios = [], setUsuarios] = useState();
  const [permisos = [], setPermisos] = useState();     
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

  function removerPermiso()
  {

  }

  function getPermisos(uid) {
    console.log("UID ->"+uid);
    axios
      .get(
        "http://18.223.121.116:4000/permiso/permisosUsuario",
        { 
            id_usuario: uid
        }
      )
      .then((res)=>{
          console.log(res.data);
        setPermisos(res.data);
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
        <h1 align="center">Remover Permiso </h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Usuario</label>
          <select class="form-control" onChange={(event) => {    
                                                                setUsuario(event.target.value)
                                                                console.log(event.target.value); 
                                                                getPermisos(3);
                                                            }}>
                {lista}
            </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">Permisos Disponibles</label>
          <select class="form-control" onChange={(event) =>     setPermiso(event.target.value) }>
                {lista}
            </select>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => removerPermiso()}>
        {" "}
        Remover
      </button>
    </div>
  );
}
