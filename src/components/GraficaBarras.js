import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var updateInterval = 500;

class GraficaBarras extends Component {
	constructor() {
		super();
		//this.updateChart = this.updateChart.bind(this);
    }


	render() {
        const opciones = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title:{
              text: "Reporte Barras"
            },
            data: [{
              type: "column", //change type to bar, line, area, pie, etc
              //indexLabel: "{y}", //Shows y value on all Data Points
              indexLabelFontColor: "#5A5757",
              indexLabelPlacement: "outside",
              dataPoints: this.props.opc_barras
            }]
          }
        
        
		return (
		<div>
			<CanvasJSChart options = {opciones} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default GraficaBarras;