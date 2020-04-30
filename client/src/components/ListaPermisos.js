import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListaPermisos() {
  const [permisos = [], setPermisos] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/permiso/getPermisos"
        
      )
      .then((res) => {
        console.log(res.data);
        setPermisos(res.data);
      });
  }, []);

  
  const lista = permisos.map((element) => {
    {
      return (
        <div className="col-md-3 card datos">
          <h3
            /*
            className={`card-header  ${getColor(
              element.paciente.riesgo
            )} ${getColorT(element.paciente.riesgo)}`}
          >
            {" "}*/
            >
            {element.nombre}
          </h3>
          <p className="card-body">ID: {element.ID} <br>
          </br>ID_Rol: {element.ID_rol}<br></br>
          </p>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <h2 className="datos text-secondary" align="center">
        {" "}
        Permisos Disponibles
      </h2>
      {lista}
    </div>
  );
}
