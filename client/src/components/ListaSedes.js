import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListaBodegas() {
  const [sedes = [], setSedes] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/sede/getSedes"
        
      )
      .then((res) => {
        console.log(res.data);
        setSedes(res.data);
      });
  }, []);

  
  const lista = sedes.map((element) => {
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
            {element.alias}
          </h3>
          <p className="card-body">Direccion: {element.direccion} <br>
          </br>Municipio: {element.municipio}<br></br>
          Encargado: {element.encargado}<br></br>
          ID: {element.id}
          </p>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <h2 className="datos text-secondary" align="center">
        {" "}
        Sedes Registradas
      </h2>
      {lista}
    </div>
  );
}
