import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListaRoles() {
  const [roles = [], setRoles] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/rol/getRoles"
        
      )
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);
      });
  }, []);

  
  const lista = roles.map((element) => {
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
          <p className="card-body">ID: {element.id} <br></br>
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
