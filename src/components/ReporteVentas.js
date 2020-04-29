import React, { useEffect, useState } from "react";
import axios from "axios";
import CanvasJSReact from '../canvasjs.react';
import GraficaBarras from "./GraficaBarras";
import GraficaPie from "./GraficaPie";
import GraficaDona from "./GraficaDona";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function ReporteVentas() {
  const [ventas = [], setVentas] = useState();
  const [fecha_inicial = [], setFechaIni] = useState();
  const [fecha_final = [], setFechaFin] = useState();
  const [vendedor = [], setVendedorFiltro] = useState();
  const [tipo_rango = [], setTipoRango] = useState();
  const [vendedores = [], setVendedores] = useState();
  const [opc_barras = [], setBarras] = useState();
  
  var data = [];


  useEffect(() => {
    axios
      .get(
        
        "http://18.223.121.116:4000/usuario/getVendedores"
        
      )
      .then((res) => {
        console.log(res.data);
        setVendedores(res.data);
      });
  }, []);


  function getVentasVendedor(){
    axios
    .post(
      
      "http://18.223.121.116:4000/reporte/cantVentas",
      {
        vendedor:vendedor
      }
      
    )
    .then((res) => {
      console.log("las ventas son:");
      console.log(ventas);
      console.log("el vendedor es:");
      console.log(vendedor);
      setVentas(res.data);
      setBarras(generarGraficas(fecha_inicial,fecha_final, tipo_rango, ventas));
    });
    console.log("op_barras");
    console.log(opc_barras);
    
  }
  


  //PIE
  const options_pie = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title:{
      text: "Trip Expenses"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",		
      startAngle: -90,
      dataPoints: [
        { y: 20, label: "Airfare" },
        { y: 24, label: "Food & Drinks" },
        { y: 20, label: "Accomodation" },
        { y: 14, label: "Transportation" },
        { y: 12, label: "Activities" },
        { y: 10, label: "Misc" }	
      ]
    }]
  }
  //DOUGHNUT
  const options_doughnut = {
    animationEnabled: true,
    title: {
      text: "Customer Satisfaction"
    },
    subtitles: [{
      text: "71% Positive",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Unsatisfied", y: 5 },
        { name: "Very Unsatisfied", y: 31 },
        { name: "Very Satisfied", y: 40 },
        { name: "Satisfied", y: 17 },
        { name: "Neutral", y: 7 }
      ]
    }]
  }

  const lista_vendedores = vendedores.map((element) => {
    {
      return (
        <option>{element.nombre}</option>
      );
    }
  });

  return (
    <div>
     <h2 className="datos text-secondary" align="center">
        {" "}
        Reporte Ventas
      </h2>
      <div class="form-group col-6">
        <label for="exampleFormControlSelect2">fecha inicial</label>
        <input
                type="date"
                class="form-control"
                id="fecha_ini"
                onChange={(event) => setFechaIni(event.target.value)}
              />
        <label for="exampleFormControlSelect2">fecha final</label>
        <input
                type="date"
                class="form-control"
                id="fecha_fin"
                onChange={(event) => setFechaFin(event.target.value)}
              />
        <label for="exampleFormControlSelect1">Vendedor</label>
            <select
              class="form-control"
              id="vendedor"
              onChange={(event) => setVendedorFiltro(event.target.selectedIndex)}
            >
              <option>Seleccione Vendedor</option>
             {lista_vendedores}
            </select>
        <label for="exampleFormControlSelect1">Filtro de Rango</label>
          <select
            class="form-control"
            id="vendedor"
            onChange={(event) => setTipoRango(event.target.selectedIndex-1)}
          >
            <option>Seleccione Tipo de rango...</option>
            <option>Dias</option>
            <option>Semana</option>
            <option>Mes</option>
          </select>
      </div>

      <button className="btn-primary" onClick={() =>getVentasVendedor()}>
      Generar Graficas
      </button>
     
        <GraficaBarras opc_barras = {opc_barras}/>
        <GraficaPie opc_barras = {opc_barras}/>
        <GraficaDona opc_barras = {opc_barras}/>
      
    
    </div>
  );
}

function generarGraficas(fecha_inicial,fecha_final, tipo_rango, ventas){
  

  var inicio = fecha_inicial.split("-");
  var final = fecha_final.split("-");
  for (let index = 0; index < 3; index++) {
    inicio[index] = parseInt(inicio[index]);
    final[index] = parseInt(final[index]);    
  }

  switch (tipo_rango) {
    case 0:
      return getDataDias(inicio, final, ventas);
      case 1:
        return getDataSemana(inicio, final, ventas);
      case 2:
        return getDataMes(inicio, final, ventas);
    default:
      break;
  }
}

function getDataDias(fecha_inicio, fecha_final, data){
  
  var res = [];

  data.forEach(element => {

    var fecha_label = element.fecha_factura.split("T");
    var aux =  fecha_label[0].split("-");
    for (let index = 0; index < 3; index++) {
     aux[index] = parseInt(aux[index]);
    }

    var ini = new Date(fecha_inicio[0],fecha_inicio[1],fecha_inicio[2]);
    var fin = new Date(fecha_final[0],fecha_final[1],fecha_final[2]);
    var comp = new Date(aux[0],aux[1],aux[2]);

    if (ini <= comp && comp <= fin) {
      res.push({
        label: fecha_label[0],
        y: element.cantidad
      });
    }

    });



  return res;
}

function getDataMes(fecha_inicio, fecha_final, data){
  
  var res = [];
  var cantidad_mes=0;
  data.forEach(element => {

    var fecha_label = element.fecha_factura.split("T");
    var aux =  fecha_label[0].split("-"); 

    for (let index = 0; index < 2; index++) {
     aux[index] = parseInt(aux[index]);
    }

    var ini = new Date(fecha_inicio[0],fecha_inicio[1],fecha_inicio[2]);
    var fin = new Date(fecha_final[0],fecha_final[1],fecha_final[2]);
    var comp = new Date(aux[0],aux[1],aux[2]);

    if(ini <= comp && comp <= fin){    
        if(res.length == 0){
          res.push(
            {
              label: aux[0]+"/"+aux[1],
              y: element.cantidad
            }
          )
        }else{
          var band = true;
          for (let index = 0; index < res.length; index++) {
           
            if(res[index].label == aux[0]+"/"+aux[1] ){
              res[index].y += element.cantidad;
              band = false;
              break;
            }
        }

          if(band){
            res.push(
              {
                label: aux[0]+"/"+aux[1],
                y: element.cantidad
              }
            );
          }
          

        }
      }
  });

  return res;
}

function getDataSemana(fecha_inicio, fecha_final, data){
  var res = [];
  var cantidad_mes=0;
  data.forEach(element => {

    var fecha_label = element.fecha_factura.split("T");
    var aux =  fecha_label[0].split("-"); 

    for (let index = 0; index < 2; index++) {
     aux[index] = parseInt(aux[index]);
    }

    var ini = new Date(fecha_inicio[0],fecha_inicio[1],fecha_inicio[2]);
    var fin = new Date(fecha_final[0],fecha_final[1],fecha_final[2]);
    var comp = new Date(aux[0],aux[1],aux[2]);

    if(ini <= comp && comp <= fin){  
      if(res.length == 0){
        res.push(
          {
            label: aux[0]+"/"+aux[1]+" SEMANA "+(Math.round(aux[2]/7)),
            y: element.cantidad
          }
        )
      }else{
        var band = true;
        res.forEach(element2 => {
          if(element2.label == aux[0]+"/"+aux[1]+" SEMANA "+(aux[2]/7)){
            element2.y += element.cantidad;
            band = false;
            return;
          }
        });

        if(band){
          res.push(
            {
              label: aux[0]+"/"+aux[1]+"SEMANA "+(aux[2]/4+1),
              y: element.cantidad
            }
          );
        }
        

      }
    } 
  });

  return res;
}