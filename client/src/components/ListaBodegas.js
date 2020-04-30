import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListaBodegas() {
  const [pacientes = [], setPacientes] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/bodega/getBodegas"
        
      )
      .then((res) => {
        console.log(res.data);
        setPacientes(res.data);
      });
  }, []);

  
  const lista = pacientes.map((element) => {
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
          <p className="card-body"> Direccion: {element.direccion} <br></br>
          Estado: {element.estado}<br></br>
          ID: {element.ID}<br></br>
          Sede: {element.sede}
          </p>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <h2 className="datos text-secondary" align="center">
        {" "}
        Bodegas Registradas
      </h2>
      {lista}
    </div>
  );
}
