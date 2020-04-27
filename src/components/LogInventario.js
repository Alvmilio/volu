import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LogInventario() {
  const [logs = [], setLogs] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/inventario/getLogs"
        
      )
      .then((res) => {
        console.log(res.data);
        setLogs(res.data);
      });
  }, []);

  
  const lista = logs.map((element) => {
    {
      return (
        <div className="col-md-3 card datos">
          <h3>
            {element.fecha}
          </h3>
          <p className="card-body"> {element.DPI} <br>
          </br> {element.id_bodega}<br></br>
          {element.id_producto}<br></br>
          {element.cantvieja}<br></br>
          {element.cantnueva}<br></br>
          {element.motivo}<br></br>
          {element.idusuario}
          </p>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <h2 className="datos text-secondary" align="center">
        {" "}
        Logs de Inventarios 
      </h2>
      {lista}
    </div>
  );
}
