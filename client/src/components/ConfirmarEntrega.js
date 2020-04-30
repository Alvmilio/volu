import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaProductos from "./ListaProductos";

export default function RegistrarVenta() {
  const [detalles = [], setdetalles] = useState();
  const [estado , setestado] = useState();
  const [tipo , settipo] = useState();
  const [transferencias = [], setTransferencias] = useState();
  const [bodOrigen, setBodorigen] = useState();
  const [repartidores = [], setRepartidores] = useState();
  const [bodDestino, setBoddestino] = useState();
  const [transferencia, settransferencia] = useState();
  const [cantidad, setCantidad] = useState();
  const [sede, setSede] = useState();
  const usr = JSON.parse(localStorage.getItem('user'));
  const usrl=usr.ID;
  const [fecha, setfecha] = useState();
  const [repartido, setRepartido] = useState();
  
  useEffect(() => {
    //getBodegas();
    //getTransferencias();
   
   

    ///Codigo para validaciones
  }, []);
   function getTransferenciasI()
  {
    settipo(1)
    axios
      .get(
        "http://18.223.121.116:4000/transferencia/getTransferencias",
        console.log("usuario logueado: "+usr.ID)
        
      )
      .then((res)=>{
        setTransferencias(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function getTransferenciasE()
  {
    settipo(2)
    axios
      .get(
        "http://18.223.121.116:4000/transferencia/getTransferencias",
        console.log("usuario logueado: "+usr.ID)
        
      )
      .then((res)=>{
        setTransferencias(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  function aprobar(){
    console.log("trasnferencia seleccionada "+transferencia);
    axios
    .post(
      "http://18.223.121.116:4000/transferencia/modificarEstadoTransferencia",
      {
          estado: 2,
          usuario: usrl, 
          transferencia: transferencia 
    
        
      }

    )
    .then((res)=>{
        alert("se aprobo Transferencia");
      console.log(res);
     
      //const jaja = JSON.parse(res);
      //console.log("traslado interno creado"+jaja.insertId)
    })
    .catch((error)=>{
      console.log(error);
    });

  }
  function ConfirmarEntrega(){
    console.log("trasnferencia seleccionada "+transferencia);
    axios
    .post(
      "http://18.223.121.116:/transferencia/confirmarTransferencia",
      {
          
          transferencia: transferencia 
    
        
      }

    )
    .then((res)=>{
        alert("se acepto envio de  transferencia");
       console.log(res);
     
      //const jaja = JSON.parse(res);
      //console.log("traslado interno creado"+jaja.insertId)
    })
    .catch((error)=>{
      console.log(error);
    });  
}

  

 



  

  const ListaTransferencias = transferencias.map((element) => {
    {
      if(element.tipo==tipo){
        return (
            <option value={element.ID}>{element.ID}</option>
          );
      }      
     
    }
  });

  return (
    <div className="formulario">
      <form autoComplete="off">
      <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => getTransferenciasI()}>
                {" "}
               Transferencias Internas
          </button>
          
          </div>
          <br></br>
          <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => getTransferenciasE()}>
                {" "}
                Transferencias Externas
          </button>
          
          </div>

        <h1 align="center">Seleccionar Transferencia</h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Transferencia: </label>
          <select class="form-control" onChange={(event) =>   {  settransferencia(event.target.value); }}>
                    {ListaTransferencias}
                </select>
                <br></br>
                <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => ConfirmarEntrega()}>
                {" "}
               Confirmar Entrega
          </button>
          
          </div>
          
         
         

        </div>
     
      </form>
    </div>



  );
}
