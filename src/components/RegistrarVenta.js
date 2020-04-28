import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegistrarVenta() {
  const [usuarios = [], setUsuarios] = useState();
  const [bodegas = [], setBodegas] = useState();
  const [productos = [], setProductos] = useState();
  const [cliente, setCliente] = useState();
  const [fecha, setFecha] = useState();
  const [bodega, setBodega] = useState();
  const [ventaid, setVentaid] = useState();
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [precio, setPrecio] = useState();


  useEffect(() => {
    getBodegas();
    getProductos();

 
    axios
      .get(
        
        "http://18.223.121.116:4000/cliente/getClientes",
        
        
      )
      .then((res) => {
        console.log(res.data);
        setUsuarios(res.data);
      });
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

  function generarTransaccion() {
    var usr = JSON.parse(localStorage.getItem('user'));
    console.log("Cliente"+cliente);
    console.log("Bodega:"+bodega);
    
    axios
      .post(
        "http://18.223.121.116:4000/venta/nuevaVentaLocal",
        {
          cliente: cliente,
          vendedor: usr.ID,
          bodega: bodega
        }
      )
      .then((res)=>{
        console.log("sede creada")
        console.log(res);
        console.log("ID->"+res.data.insertId);
        setVentaid(res.data.inserId);
      })
      .catch((error)=>{
        console.log("error alv")
        console.log(error);
      });
  }

  

  function agregarProducto()
  {
    axios
    .post(
      "http://18.223.121.116:4000/venta/detalleVenta",
      {
        ID_producto: producto,
        ID_venta: ventaid,
        cantidad: cantidad,
        precio_venta: precio
      }
    )
    .then((res)=>{
      console.log("detalle_venta agregado")
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  function concluirVenta()
  {
    axios
    .post(
      "http://18.223.121.116:4000/venta/finalizarVentaLocal",
      {
        ID_venta: ventaid
      }
    )
    .then((res)=>{
      console.log("detalle_venta agregado")
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  const lista = usuarios.map((element) => {
    {
      return (
        <option value={element.ID}>{element.DPI}</option>
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
            <label for="exampleFormControlSelect2">Bodega</label>
            <select class="form-control" onChange={(event) =>     setBodega(event.target.value) }>
                {listaBodegas}
            </select>
          </div>
          
        </div>
        <div class="text-center">
          <button type="button" className="btn-primary" onClick={() => generarTransaccion()}>
                {" "}
                Generar Transaccion
          </button>
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
        <div class="form-group">
          <label for="exampleFormControlSelect2">Precio de Venta</label>
          <input
            type="number"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => setPrecio(event.target.value)}
          />
        </div>
        <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => agregarProducto()}>
                {" "}
                Agregar Producto
          </button>
          <br/>
        <button type="button" className="btn-primary" onClick={() => agregarProducto()}>
                {" "}
                Finalizar Venta
          </button>
        </div>
        
      </form>
    </div>
  );
}
