import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var updateInterval = 500;

class GraficaDona extends Component {
	constructor() {
		super();
		//this.updateChart = this.updateChart.bind(this);
    }


	render() {
        const opciones = {
            animationEnabled: true,
            title: {
              text: "Reporte Dona"
            },
            subtitles: [{
              verticalAlign: "center",
              fontSize: 24,
              dockInsidePlotArea: true
            }],
            data: [{
              type: "doughnut",
              showInLegend: true,
              indexLabel: "{name}: {y}",
              yValueFormatString: "#,###'%'",
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

export default GraficaDona;