import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegistrarVenta() {
  const [usuarios = [], setUsuarios] = useState();
  const [cliente, setCliente] = useState();
  const [fecha, setFecha] = useState();
  const [entrega, setEntrega] = useState();
  const [producto, setProducto] = useState();


  useEffect(() => {

    var usr = JSON.parse(localStorage.getItem('user'));
 
    axios
      .get(
        
        "http://18.223.121.116:4000/usuario/getUsuarios",
        
        
      )
      .then((res) => {
        console.log(res.data);
        setUsuarios(res.data);
      });
  }, []);

  function registrarVenta() {
    axios
      .post(
        "http://18.223.121.116:4000/usuario/getUsuarios",
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
        console.log("sede creada")
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function agregarProducto()
  {
    axios
    .post(
      "http://18.223.121.116:4000/usuario/getUsuarios",
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
      console.log("sede creada")
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
  });

  return (
    <div className="formulario">
      <form autoComplete="off">
        <h1 align="center">Registrar Venta </h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Cliente</label>
          <select class="form-control" onChange={(event) =>     setCliente(event.target.value) }>
                    {lista}
                </select>
        </div>

        <div className="row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Fecha de Facturacion</label>
            <input
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="29/04/1997"
            onChange={(event) => setFecha(event.target.value)}
          />
          </div>
          <div class="form-group col-6">
            <label for="exampleFormControlSelect2">Fecha de Entrega (Si aplica)</label>
            <input
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="29/04/1997"
            onChange={(event) => setEntrega(event.target.value)}
          />
          </div>
          <button className="btn-primary" onClick={() => registrarVenta()}>
                {" "}
                Generar Factura
          </button>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Productos</label>
          <select class="form-control" onChange={(event) =>     setProducto(event.target.value) }>
                {lista2}
            </select>
        </div>
        <button className="btn-primary" onClick={() => agregarProducto()}>
                {" "}
                Agregar Producto
          </button>
       
        
      </form>
    </div>
  );
}
