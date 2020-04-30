import React, { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import ListaProductos from "./ListaProductos";

export default function RegistrarVenta() {
  const [sedes = [], setSedes] = useState();
  const [bodegas = [], setBodegas] = useState();
  const [productos = [], setProductos] = useState();
  const [bodOrigen, setBodorigen] = useState();
  const [repartidores = [], setRepartidores] = useState();
  const [bodDestino, setBoddestino] = useState();
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [sede, setSede] = useState();
  const [sedeOrigen, setSedeorigen] = useState();
  const [sedeDestino, setSededestiono] = useState();


  const usr = JSON.parse(localStorage.getItem('user'));
  const usrl=usr.ID;
  const [fecha, setfecha] = useState();
  const [repartido, setRepartido] = useState();
  const [idtraslado, setidtraslado] = useState();
  const [state, setState] = useState();
  useEffect(() => {
    validarPermisos();
    //getBodegas();
    getProductos();
    getSedes();
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

  function getBodegasOrigen(){
    
    console.log("sede origen"+sedeOrigen);
    axios
      .post(
        "http://18.223.121.116:4000/bodega/getBodegasDeSede",
        {
            
            sede: sedeOrigen
         
          
        }

       
      )
      .then((res)=>{
        console.log(res.data);
       setBodegas(res.data);
        //const jaja = JSON.parse(res);
        console.log(res.data)
      })
      .catch((error)=>{
        console.log(error);
      });

  }

  function getBodegasDestino(){
    
    console.log("sede destino"+sedeDestino);
    axios
      .post(
        "http://18.223.121.116:4000/bodega/getBodegasDeSede",
        {
            
            sede: sedeDestino
         
          
        }

       
      )
      .then((res)=>{
        console.log(res.data);
       setBodegas(res.data);
        //const jaja = JSON.parse(res);
        console.log(res.data)
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


  

  function AgregarDetalleTraslado() {
    console.log("traslado "+idtraslado);
    console.log("producto "+producto);
    console.log("cantidad "+cantidad);
  
    axios
      .post(
        "http://18.223.121.116:4000/transferencia/nuevoDetalleTransferencia",
        {
            
            transferencia: idtraslado ,
            producto: producto,
            cantidad: cantidad
          
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

  function generarTranslado() {

    console.log("fecha"+fecha);
    console.log("usuario log"+usrl);
    console.log("origen"+ bodOrigen);
    console.log("destino"+bodDestino);
    console.log("repartidor"+repartido);
   
 
   axios
      .post(
        "http://18.223.121.116:4000/transferencia/nuevaTransferencia",
        {
          fecha: fecha,
          tipo: 2,
          usuario: usrl,
          bodega_fuente: bodOrigen,
          bodega_destino: bodDestino,
          repartidor: repartido
          
        }
        
      )
      .then((res)=>{
        console.log(res);
        setidtraslado(res.data.insertId)
        //idtraslado=setidtrasladores.data.insertId;
        //const jaja = JSON.parse(res);
        //console.log("traslado interno creado"+jaja.insertId)
      })
      .catch((error)=>{
        console.log(error);
      }); 
  
  }

  const listaSedes = sedes.map((element) => {
    {
      return (
        <option value={element.id}>{element.alias} - {element.direccion}</option>
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

  function validarPermisos()
  {
    var usr = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        "http://18.223.121.116:4000/permiso/tienePermiso",
        {
          usuario: usr.ID,
          permiso: 5
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
        <h1 align="center">Solicitar Traslado Externo </h1>
        <h3>Elegir Sede</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Sede Origen: </label>
          <select class="form-control" onChange={(event) =>   {  setSedeorigen(event.target.value); }}>
                    {listaSedes}
                </select>
                <br></br>
                <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => getBodegasOrigen()}>
                {" "}
                Ver Bodegas Disponibles
          </button>
          </div>
        </div>


        <h3>Elegir Bodega Origen</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Bodega Origen: </label>
          <select class="form-control" onChange={(event) =>    setBodorigen(event.target.value) }>
                    {listaBodegas}
                </select>
        </div>

        <h3>Elegir Sede</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Sede Destino: </label>
          <select class="form-control" onChange={(event) =>   {  setSededestiono(event.target.value); }}>
                    {listaSedes}
                </select>
                <br></br>
                <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => getBodegasDestino()}>
                {" "}
                Ver Bodegas Disponibles
          </button>
          </div>
        </div>


        <h3>Elegir Bodega Destino</h3>
        <div class="form-group">
          <label for="exampleFormControlInput1">Bodega Destino: </label>
          <select class="form-control" onChange={(event) =>    setBoddestino(event.target.value) }>
                    {listaBodegas}
                </select>
        </div>

       

        <div class="form-group">
        <label for="exampleFormControlSelect2">Fecha de Traslado</label>
        <input
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="29/04/1997"
          onChange={(event) => setfecha(event.target.value)}
        />
      </div>
      <div class="form-group">
          <label for="exampleFormControlInput1">Repartidor: </label>
          <select class="form-control" onChange={(event) =>     setRepartido(event.target.value) }>
                    {listaRepartidor}
                </select>
        </div>

        
        <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => generarTranslado()}>
                {" "}
                Crear Traslado Interno
          </button>
        </div>
        
        <br></br>
        <h1 align="center">Agregar Productos a Traslado  </h1>
        
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
      <div class="text-center">
        <button type="button" className="btn-primary" onClick={() => AgregarDetalleTraslado()}>
                {" "}
                Agregar a Traslado
          </button>
        </div>

      </form>
    </div>



  
 



  );
}
