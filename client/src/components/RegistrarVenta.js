import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import * as jsPDF from 'jspdf'

export default function RegistrarVenta() {
  const [usuarios = [], setUsuarios] = useState();
  const [bodegas = [], setBodegas] = useState();
  const [productos = [], setProductos] = useState();
  const [cliente = 1, setCliente] = useState();
  const [fecha, setFecha] = useState();
  const [bodega = 1, setBodega] = useState();
  const [ventaid, setVentaid] = useState();
  const [producto = 1, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [precio, setPrecio] = useState();
  const [state, setState] = useState();


  const [ facturapdf, setFacturaPDF ] = useState();
  const [ clientepdf, setClientePDF ] = useState();
  const [ vendedorpdf, setVendedorPDF ] = useState();
  const [ fechapdf, setFechaPDF ] = useState();
  const [ fechaepdf, setFechaePDF ] = useState();
  const [ totalpdf, setTotalPDF ] = useState();
  const [ bodegapdf, setBodegaPDF ] = useState();
  const [ detallespdf = [], setDetallesPDF ] = useState();








  useEffect(() => {
    validarPermisos();
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
          bodega: bodega,
          fecha_factura: fecha,
          fecha_entrega: fecha
        }
      )
      .then((res)=>{
        console.log("sede creada")
        console.log(res);
        console.log("ID->"+res.data.insertId);
        setVentaid(res.data.insertId);
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
      console.log(res);
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
      console.log(res);
      GenerarFactura();
      generarpdf();
    })
    .catch((error)=>{
      console.log(error);
    });

  }

  function GenerarFactura(){
    
    axios
    .post(
      "http://18.223.121.116:4000/factura/getHeader",{
          venta:ventaid
      }
    )
    .then((res)=>{
        console.log("datos de encabezado");
        console.log(res.data);

        console.log("Factura"+res.data[0].Factura)
        console.log("Cliente"+res.data[0].Cliente)
        console.log("vendedor"+res.data[0].Vendedor)
        console.log("Fecha F"+res.data[0].fecha_factura)
        console.log("Fecha E"+res.data[0].fecha_entrega)
        console.log("total"+res.data[0].total)
        console.log("bodega"+res.data[0].Bodega)


        setFacturaPDF(res.data[0].Factura)
        setClientePDF(res.data[0].Cliente)
        setVendedorPDF(res.data[0].Vendedor)
        setFechaPDF(res.data[0].fecha_factura)
        setFechaePDF(res.data[0].fecha_entrega)
        setTotalPDF(res.data[0].total)
        setBodegaPDF(res.data[0].Bodega)
        GenerarFactura2();
        

    })
    .catch((error)=>{
      console.log(error);
    });


    

  }


  function GenerarFactura2(){
    
    axios
    .post(
      "http://18.223.121.116:4000/factura/getDetalle",{
          venta:ventaid
      }
    )
    .then((res)=>{
        console.log("datos de detalle");
        console.log(res.data);
        setDetallesPDF(res.data);
        generarpdf();
       

    })
    .catch((error)=>{
      console.log(error);
    });


    

  }



  function generarpdf(){
    var doc = new jsPDF();
    doc.setDrawColor(255, 0, 0);
    doc.text(10, 10, 'No. Factura: '+facturapdf);
    doc.text(10, 20, 'Fecha Factura: '+fechapdf);
    doc.text(10, 25, 'Fecha Envio: '+fechaepdf);
    doc.text(10, 35, 'Vendedor: '+vendedorpdf);
    doc.text(10, 40, 'Cliente: '+clientepdf);
    doc.text(10,45,'Bodega: '+bodegapdf);
    doc.text(120, 55, 'TOTAL: '+totalpdf);
  
    doc.text(22,80,'Nombre ');
    doc.text(80,80,'Cantidad ');
    doc.text(140,80,'Precio U. ');
   var valor_imprimir;
   var valor_imprimir2;
   var valor_imprimir3;
    for(var i=0; i<detallespdf.length;i++){
        valor_imprimir = ('  '+detallespdf[i].nombre).trim();
        valor_imprimir2 = ('  '+detallespdf[i].cantidad).trim();
        valor_imprimir3 = ('  '+detallespdf[i].precio_venta).trim();
        doc.text(20,90+(i*5),valor_imprimir);
        doc.text(80,90+(i*5),valor_imprimir2);
        doc.text(140,90+(i*5),valor_imprimir3);
    //doc.text(1*22,90+(i*5),detalles[i].nombre);
    //doc.text(2*40,90+(i*5),detalles[i].cantidad);
                               
    }

    


    doc.save('factura-chocoPanel.pdf');
  }


  const lista = usuarios.map((element) => {
    {
      return (
        <option value={element.ID}>{element.DPI} - {element.nombre}</option>
      );
    }
  });

  const lista2 = productos.map((element) => {
    {
      return (
        <option value={element.ID}>{element.codigo_barras} - {element.nombre} - Q{element.precio} </option>
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

  function validarPermisos()
  {
    var usr = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        "http://18.223.121.116:4000/permiso/tienePermiso",
        {
          usuario: usr.ID,
          permiso: 2
        }
      )
      .then((res)=>{
        console.log(res);
        if(res.data.res == 0){
          alert("No tiene acceso a este modulo\n Adios!");
          setState(1);
        }
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function renderRedirect()
  {
    if(state == 1)
      return <Redirect to='/iniciarSesion' />
  }


  return (
    <div className="formulario">
      {renderRedirect()}
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
        <button type="button" className="btn-primary" onClick={() => concluirVenta()}>
                {" "}
                Finalizar Venta
          </button>
        </div>
        
      </form>
    </div>
  );
}
