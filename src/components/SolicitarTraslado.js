import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegistrarVenta() {
  const [sedes = [], setSedes] = useState();
  const [bodegas = [], setBodegas] = useState();
  const [productos = [], setProductos] = useState();
  const [bodOrigen, setBodorigen] = useState();
  const [bodDestino, setBoddestino] = useState();
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [sedeOrigen = 1, setSedeorigen] = useState();
  const [sedeDestino = 1, setSededestiono] = useState();


  useEffect(() => {
    getBodegas();
    getProductos();
    getSedes();

    ///Codigo para validaciones
  }, []);

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

  function getSedes()
  {
    axios
      .get(
        "http://18.223.121.116:4000/sede/getSedes",
      )
      .then((res)=>{
        setSedes(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function generarTranslado() {
    
  }

  const listaSedes = sedes.map((element) => {
    {
      return (
        <option value={element.id}>{element.alias} - {element.direccion}</option>
      );
    }
  });

  const lista2 = productos.map((element) => {
    {
      return (
        <option value={element.ID}>{element.codigo_barras} - {element.nombre}</option>
      );
    }
  });

  const listaBodegas = bodegas.map((element) => {
    {
      return (
        <option value={element.ID}>{element.nombre+" - "+element.direccion}</option>
      );
    }
  });

  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Solicitar Traslado </h1>
        <h3>Origen</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Sede</label>
          <select class="form-control" onChange={(event) =>     setSedeorigen(event.target.value) }>
                    {listaSedes}
                </select>
        </div>

        <div class="form-group">
            <label for="exampleFormControlSelect1">Bodega</label>
            <select class="form-control" onChange={(event) =>     setBodorigen(event.target.value) }>
                    {listaBodegas}
                </select>
          </div>
        <h3>Destino</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Sede</label>
          <select class="form-control" onChange={(event) =>     setSededestiono(event.target.value) }>
                    {listaSedes}
                </select>
        </div>

        <div class="form-group">
            <label for="exampleFormControlSelect1">Bodega</label>
            <select class="form-control" onChange={(event) =>     setBoddestino(event.target.value) }>
                    {listaBodegas}
                </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Productos</label>
          <select class="form-control" onChange={(event) =>     setProducto(event.target.value) }>
                {lista2}
            </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Cantidad</label>
          <input
            type="number"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setCantidad(event.target.value)}
          />
        </div>
        <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => generarTranslado()}>
                {" "}
                Trasladar
          </button>
        </div>
        
      </form>
    </div>
  );
}
