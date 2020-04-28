import React, { useState } from "react";
import axios from "axios";

export default function NuevoProducto() {
  const [sku, setSku] = useState();
  const [codigo, setCodigo] = useState();
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precio, setPrecio] = useState();

  function crearProducto() {
    axios
      .post(
        "http://18.223.121.116:4000/producto/nuevoProducto",
        {
          SKU: sku,
          codigo_barras: codigo,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio
        }
      )
      .then((res)=>{
        console.log("producto creado")
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Nuevo Producto </h1>
        <h2>Datos Producto</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">SKU</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setSku(event.target.value)}
          />
        </div>

        <div className="row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Codigo de Barras</label>
            <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setCodigo(event.target.value)}
          />
          </div>
          <div class="form-group col-6">
            <label for="exampleFormControlSelect2">Nombre</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Descripcion</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Precio</label>
          <input
            class="form-control"
            id="exampleFormControlTextarea1"
            onChange={(event) => setPrecio(event.target.value)}
          ></input>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => crearProducto()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
