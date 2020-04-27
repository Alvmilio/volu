import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListaEspera() {
  const [pacientes = [], setPacientes] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/usuario/getUsuarios"
        
      )
      .then((res) => {
        console.log(res.data);
        setPacientes(res.data);
      });
  }, []);

  function ingresar(paramas) {
    axios
      .put(
        "https://3aq0p4k16e.execute-api.us-east-2.amazonaws.com/default/voluntariadoGetPost",
        { date: paramas, estadoHospital: "Ingresado" }
      )
      .then(
        axios
          .get(
            "https://3aq0p4k16e.execute-api.us-east-2.amazonaws.com/default/voluntariadoGetPost"
          )
          .then((res) => {
            console.log(res.data.Items);
            setPacientes(res.data.Items);
          })
      );
  }

  function getColor(params) {
    if (params === "Alto") {
      return "bg-danger";
    } else if (params === "Medio") {
      return "bg-warning";
    } else {
      return "bg-primary";
    }
  }

  function getColorT(params) {
    if (params === "Alto") {
      return "text-white";
    } else if (params === "Medio") {
      return "text-dark";
    } else {
      return "text-white";
    }
  }
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
          <p className="card-body"> {element.DPI} <br>
          </br> {element.correo}<br></br>
          {element.fecha}
          </p>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <h2 className="datos text-secondary" align="center">
        {" "}
        Usuarios Registrados 
      </h2>
      {lista}
    </div>
  );
}
