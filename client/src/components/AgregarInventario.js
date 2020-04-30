import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AgregarInventario() {
  const [bodegas = [], setBodegas] = useState();
  const [productos = [], setProductos] = useState();
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [bodega, setBodega] = useState();
  useEffect(() => {
    getProductos();
    getBodegas();
    ///Codigo para validar permisos
  }, []);

  function agregarInventario()
  {
    axios
    .post(
      "http://18.223.121.116:4000/bodega/agregarInventario",
      {
          ID_bodega: bodega,
          ID_producto: producto,
          cantidad: cantidad
      }
    )
    .then((res)=>{
      console.log("inventario agregado")
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  function getBodegas()
  {
    axios
      .get(
        "http://18.223.121.116:4000/bodega/getBodegas",
      )
      .then((res)=>{
        setBodegas(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function getProductos()
  {
    axios
      .get(
        "http://18.223.121.116:4000/producto/getProductos",
      )
      .then((res)=>{
        setProductos(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }


const listaBodegas = bodegas.map((element) => {
    {
      return (
        <option value={element.ID}>{element.nombre+" - "+element.direccion}</option>
      );
    }
  });

  const listaProductos = productos.map((element) => {
    {
      return (
        <option value={element.ID}>{element.nombre} - {element.codigo_barras}</option>
      );
    }
  });


  return (
    <div className="formulario">
    <form autoComplete="off">
      <h1 align="center">Agregar Inventario por Bodega</h1>
      <h3>Seleccionar Bodega</h3>
      <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setBodega(event.target.value)}
            >
                {listaBodegas}
      </select>
      <div class="form-group">
        <label for="exampleFormControlInput1">Producto</label>
        <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setProducto(event.target.value)}
            >
                {listaProductos}
      </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Cantidad</label>
        <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setCantidad(event.target.value)}
          />
      </div>

      
    </form>
    <div class="text-center">
    <button className="btn-primary" onClick={() => agregarInventario()}>
      {" "}
      Agregar
    </button>
    </div>
  </div>
  );
}
