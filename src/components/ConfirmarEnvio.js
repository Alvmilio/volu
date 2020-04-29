import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaProductos from "./ListaProductos";
import * as jsPDF from 'jspdf'
export default function RegistrarVenta() {
  
  const [estado , setestado] = useState();
  const [tipo , settipo] = useState();
  const [transferencias = [], setTransferencias] = useState();
  const [encabezado, setencabezado] = useState();
  const [bodOrigen, setBodorigen] = useState();
  const [detalles = [], setdetalles] = useState();
  const [bodDestino, setBoddestino] = useState();
  const [transferencia, settransferencia] = useState();
  const [cantidad, setCantidad] = useState();
  const [sede, setSede] = useState();
  const usr = JSON.parse(localStorage.getItem('user'));
  const usrl=usr.ID;
  
  const [repartido, setRepartido] = useState();

  //factura
  const [factura, setfactura] = useState();
  const [cliente, setcliente] = useState();
  const [vendedor, setvendedor] = useState();
  const [fechae, setfechae] = useState();
  const [fecha, setfecha] = useState();
  const [total, settotal] = useState();
  const [bodega, setbodega] = useState();
  useEffect(() => {
    //getBodegas();
    getTransferencias();
   
   

    ///Codigo para validaciones
  }, []);

  function GenerarFactura(){
    
    axios
    .post(
      "http://18.223.121.116:4000/factura/getHeader",{
          venta:transferencia
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

        setfactura(res.data[0].Factura)
        setcliente(res.data[0].Cliente)
        setvendedor(res.data[0].Vendedor)
        setfecha(res.data[0].fecha_factura)
        setfechae(res.data[0].fecha_entrega)
        settotal(res.data[0].total)
        setbodega(res.data[0].Bodega)
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
          venta:transferencia
      }
    )
    .then((res)=>{
        console.log("datos de detalle");
        console.log(res.data);
        setdetalles(res.data);
        generarpdf();
       

    })
    .catch((error)=>{
      console.log(error);
    });


    

  }

  function generarpdf(){
    var doc = new jsPDF();
    doc.setDrawColor(255, 0, 0);
    doc.text(10, 10, 'No. Factura: '+factura);
    doc.text(10, 20, 'Fecha Factura: '+fecha);
    doc.text(10, 25, 'Fecha Envio: '+fechae);
    doc.text(10, 35, 'Vendedor: '+vendedor);
    doc.text(10, 40, 'Cliente: '+cliente);
    doc.text(10,45,'Bodega: '+bodega);
    doc.text(120, 55, 'TOTAL: '+total);
  
    doc.text(22,80,'Nombre ');
    doc.text(80,80,'Cantidad ');
    doc.text(140,80,'Precio U. ');
   var valor_imprimir;
   var valor_imprimir2;
   var valor_imprimir3;
    for(var i=0; i<detalles.length;i++){
        valor_imprimir = ('  '+detalles[i].nombre).trim();
        valor_imprimir2 = ('  '+detalles[i].cantidad).trim();
        valor_imprimir3 = ('  '+detalles[i].precio_venta).trim();
        doc.text(20,90+(i*5),valor_imprimir);
        doc.text(80,90+(i*5),valor_imprimir2);
        doc.text(140,90+(i*5),valor_imprimir3);
    //doc.text(1*22,90+(i*5),detalles[i].nombre);
    //doc.text(2*40,90+(i*5),detalles[i].cantidad);
                               
    }

    


    doc.save('factura-chocoPanel.pdf');
  }
   function getTransferencias()
  
  { console.log("user repartidor logueado "+usrl);

    axios
      .post(
        "http://18.223.121.116:4000/venta/getEnviosRepartidor",{
            repartidor:usrl
        }
       
        
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
    console.log("venta seleccionada "+transferencia);
    axios
    .post(
      "http://18.223.121.116:4000/venta/confirmarEntregaEnvio",
      {
          venta: transferencia 
      }

    )
    .then((res)=>{
        alert("se acepto envio de venta");
        
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
     
        return (
            <option value={element.venta}>{element.venta}</option>
          );
         
     
    }
  });

  return (
    <div className="formulario">
      <form autoComplete="off">
      
        
        <h1 align="center">Seleccionar Envio</h1>
        <div class="form-group">
          <label for="exampleFormControlInput1">Envio: </label>
          
          <select class="form-control" onChange={(event) =>   {  settransferencia(event.target.value); }}>

                    {ListaTransferencias}
                </select>
                <br></br>
                <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => ConfirmarEntrega()}>
                {" "}
               Confirmar Envio
          </button>
          
          </div>
          <div class="text-center">
                <button type="button" className="btn-primary" onClick={() => GenerarFactura()}>
                {" "}
               Generar Factura
          </button>
          
          </div>
         
         

        </div>
     
      </form>
    </div>



  );
}

