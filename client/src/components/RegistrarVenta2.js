import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom"
import axios from "axios";
import ListaProductos from "./ListaProductos";

export default function RegistrarVenta2() {
  const [clientes = [], setClientes] = useState();
  const [bodegas = [], setBodegas] = useState();
  const [productos = [], setProductos] = useState();
  const [bodOrigen, setBodorigen] = useState();
  const [repartidores = [], setRepartidores] = useState();
  const [bodDestino, setBoddestino] = useState();
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [precio, setPrecio] = useState();
  const [cliente, setcliente] = useState();
  const [sedeOrigen = 1, setSedeorigen] = useState();
  const [sedeDestino = 1, setSededestiono] = useState();
  const usr = JSON.parse(localStorage.getItem('user'));
  const usrl=usr.ID;
  const [fecha, setfecha] = useState();
  const [fechaentrega, setfechaentrega] = useState();
  const [repartido, setRepartido] = useState();
  const [sedebodega1, setsedebodega1] = useState();
  const [sedebodega2, setsedebodega2] = useState();
  const [idtraslado, setidtraslado] = useState();
  const [state, setState] = useState();
  useEffect(() => {
    validarPermisos();
    getBodegas();
    getProductos();
    getClientes();
    getProductos();
    getRepartidores();
    

    ///Codigo para validaciones
  }, []);

  function getProductos()
  {
    axios
      .get(
        "http://18.223.121.116:4000/producto/getProductos",
        console.log("usuario logueado: "+usr.ID)
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
  function getRepartidores()
  {
    axios
      .get(
        "http://18.223.121.116:4000/usuario/getRepartidores",
      )
      .then((res)=>{
        setRepartidores(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function getClientes()
  {
    axios
      .get(
        "http://18.223.121.116:4000/cliente/getClientes",
      )
      .then((res)=>{
        setClientes(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function crearEnvio(){
    console.log("venta "+idtraslado);
    console.log("repartidor "+repartido);

    axios
    .post(
      "http://18.223.121.116:4000/venta/crearEnvioVenta",
      { 
          venta:idtraslado,
           repartidor:repartido
      }

     
    )
    .then((res)=>{
      console.log(res);
    
    })
    .catch((error)=>{
      console.log(error);
    });
    
  }

  

  function AgregarDetalleTraslado() {
    console.log("venta "+idtraslado);
    console.log("producto "+producto);
    console.log("cantidad "+cantidad);
    console.log("precio "+precio);
  

   
    axios
      .post(
        "http://18.223.121.116:4000/venta/detalleVenta",
        {
            
        
           
            ID_venta:idtraslado,
             ID_producto:producto,
            cantidad:cantidad,
            precio_venta:precio
          
        }

       
      )
      .then((res)=>{
        console.log(res);
       
        //const jaja = JSON.parse(res);
        //console.log("traslado interno creado"+jaja.insertId)
      })
      .catch((error)=>{
        console.log(error);
      });
  
  }

  function generarVenta() {

    console.log("fecha F"+fecha);
    console.log("fecha E"+fechaentrega);
    console.log("usuario vendedor"+usrl);
    console.log("origen"+ bodOrigen);
    console.log("cliente"+cliente);

   
 
   axios
      .post(
        "http://18.223.121.116:4000/venta/nuevaVentaDomicilio",
        {
            
                cliente:cliente,
                vendedor:usrl,
                bodega:bodOrigen,
                fecha_factura:fecha,
                fecha_entrega:fechaentrega
            
          
        }
        
      )
      .then((res)=>{
        console.log(res.data);
        setidtraslado(res.data.insertId)
        //idtraslado=setidtrasladores.data.insertId;
        //const jaja = JSON.parse(res);
        //console.log("traslado interno creado"+jaja.insertId)
      })
      .catch((error)=>{
        console.log(error);
      }); 
  
  }

  const listaClientes = clientes.map((element) => {
    {
      return (
        <option value={element.ID}>{element.nombre}</option>
      );
    }
  });

  const listaRepartidor = repartidores.map((element) => {
    {
      return (
        <option value={element.id}>{element.nombre}</option>
      );
    }
  });

  const ListaProductos = productos.map((element) => {
    {
      return (
        <option value={element.ID}>{element.codigo_barras} - {element.nombre} - Q{element.precio}</option>
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
        <h1 align="center">Venta a Domicilio</h1>
        <h3>Elegir Cliente</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Cliente: </label>
          <select class="form-control" onChange={(event) =>   {  setcliente(event.target.value); }}>
                    {listaClientes}
                </select>
                <br></br>
        </div>


        <h3>Elegir Bodega</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Bodega Fuente: </label>
          <select class="form-control" onChange={(event) =>    setBodorigen(event.target.value) }>
                    {listaBodegas}
                </select>
        </div>

        <div class="form-group">
        <label for="exampleFormControlSelect2">Fecha de Factura</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="29/04/1997"
          onChange={(event) => setfecha(event.target.value)}
        />
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect2">Fecha de Envio</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="29/04/1997"
          onChange={(event) => setfechaentrega(event.target.value)}
        />
      </div>
      

        
        <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => generarVenta()}>
                {" "}
                Crear Venta
          </button>
        </div>
        
        <br></br>
        <h1 align="center">Agregar Productos a Venta  </h1>
        
        <div class="form-group">
          <label for="exampleFormControlInput1">Producto: </label>
          <select class="form-control" onChange={(event) =>     setProducto(event.target.value) }>
                    {ListaProductos}
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
      <div class="form-group">
        <label for="exampleFormControlSelect2">Precio</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          onChange={(event) => setPrecio(event.target.value)}
        />
      </div>
      <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => AgregarDetalleTraslado()}>
                {" "}
                Agregar a Venta
          </button>
        </div>
        <br></br>
        <h3>Elegir Repartidor</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Repartidor: </label>
          <select class="form-control" onChange={(event) =>    setRepartido(event.target.value) }>
                    {listaRepartidor}
        </select>
        </div>
        <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => crearEnvio()}>
                {" "}
                Crear Envio
          </button>
        </div>
      </form>
    </div>



  
 



  );
}
