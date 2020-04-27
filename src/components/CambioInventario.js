import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CambioInventario() {
  const [productos = [], setProductos] = useState();
  const [bodegas = [], setBodegas] = useState();
  const [producto, setProducto] = useState();
  const [bodega, setBodega] = useState();
  const [nueva, setNueva] = useState();
  const [antigua, setAntigua] = useState();
  const [motivo, setMotivo] = useState();
  const [fecha, setFecha] = useState();

  /*
  useEffect(() => {
    getBodegas();
    axios
      .get(
        
        "http://18.223.121.116:4000/producto/getProductos"
        
      )
      .then((res) => {
        console.log(res.data);
        setBodegas(res.data);
      });
  }, []);

  function getBodegas()
  {
    axios
      .post(
        "http://18.223.121.116:4000/bodega/getBodegas"
      )
      .then((res)=>{
        console.log("producto creado")
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  const lista = usuarios.map((element) => {
    {
      return (
        <option value={element.ID+","+element.DPI}>{element.DPI}</option>
      );
    }
  });

  const lista2 = usuarios.map((element) => {
    {
      return (
        <option value={element.ID+","+element.DPI}>{element.DPI}</option>
      );
    }
  });*/


  function guardarCambio() {
    axios
      .post(
        "http://18.223.121.116:4000/usuario/nuevoUsuario",
        {
            /*
          DPI: dpi,
          nombre: nombre,
          fecha_nacimiento: fecha,
          correo: correo,
          password: clave*/
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
        <h1 align="center">Registrar Cambio </h1>
        <h2>Datos Producto</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">Producto</label>
          <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setProducto(event.target.value)}
            >
                
      </select>
        </div>

        <div className="row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Bodega</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(event) =>  setBodega(event.target.value)}
            >
               
            </select>
          </div>
          <div class="form-group col-6">
            <label for="exampleFormControlSelect2">Nueva Cantidad</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(event) => setNueva(event.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Antigua Cantidad</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setAntigua(event.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Motivo</label>
          <input
            class="form-control"
            id="exampleFormControlTextarea1"
            onChange={(event) => setMotivo(event.target.value)}
          ></input>
        </div>
        
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Fecha</label>
          <input
            class="form-control"
            id="exampleFormControlTextarea1"
            onChange={(event) => setFecha(event.target.value)}
          ></input>
        </div>

        
      </form>
      <button className="btn-primary" onClick={() => guardarCambio()}>
        {" "}
        Crear
      </button>
    </div>
  );
}
