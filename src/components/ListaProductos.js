import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListaProductos() {
  const [productos = [], setProductos] = useState();

  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/producto/getProductos"
        
      )
      .then((res) => {
        console.log(res.data);
        setProductos(res.data);
      });
  }, []);

  
  const lista = productos.map((element) => {
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
          <p className="card-body">SKU: {element.SKU} <br>
          </br>Codigo de Barras: {element.codigo_barras}<br></br>
          Descripcion: {element.descripcion}<br></br>
          Precio: {element.precio}<br></br>
          ID: {element.ID}
          </p>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <h2 className="datos text-secondary" align="center">
        {" "}
        Productos Disponibles
      </h2>
      {lista}
    </div>
  );
}
