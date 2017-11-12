import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';



class WeatherList extends Component {

	renderCity = (data) => {
		const label = data.city.name;
		// get temperature
		const temp = data.list.map ((temp) => temp.main.temp);
		return (
			<CardColumns className="cols-2" key={ data.city.id }>
				{ this.renderCurrentTemp () }
				{ this.renderLineChart ({temp : temp, label : label}) }
				{ this.renderBarChart () }
				{ this.renderDoughnutChart () }
			</CardColumns>
		);
	};

	renderCurrentTemp () {
		// set up a initial state for rendering 'null' when data
		// from async call is not ready
		if (!this.props.cityCurrentTemp) {
			return <h1>Loading!!!!</h1>;
		}
		return <h1 key={ this.props.cityCurrentTemp.sys.id }>{ this.props.cityCurrentTemp.main.temp }</h1>;
	}

	renderLineChart (data) {
		return (
			<Card>
				<CardHeader className={ 'alert alert-primary' }>
					Line Chart
					<div className="card-actions">
						<a href="http://www.chartjs.org">
							<small className="text-muted">docs</small>
						</a>
					</div>
				</CardHeader>
				<CardBody>
					<div className="chart-wrapper">
						<Line data={ returnLineData (data) }
						      options={ {
							      maintainAspectRatio : false,
						      } }
						/>
					</div>
				</CardBody>
			</Card>
		);
	}

	renderBarChart () {
		return (
			<Card>
				<CardHeader>
					Bar Chart
					<div className="card-actions">
						<a href="http://www.chartjs.org">
							<small className="text-muted">docs</small>
						</a>
					</div>
				</CardHeader>
				<CardBody>
					<div className="chart-wrapper">
						<Bar data={ bar }
						     options={ {
							     maintainAspectRatio : false,
						     } }
						/>
					</div>
				</CardBody>
			</Card>
		);
	}

	renderDoughnutChart () {
		return (
			<Card>
				<CardHeader>
					Doughnut Chart
					<div className="card-actions">
						<a href="http://www.chartjs.org">
							<small className="text-muted">docs</small>
						</a>
					</div>
				</CardHeader>
				<CardBody>
					<div className="chart-wrapper">
						<Doughnut data={ doughnut }/>
					</div>
				</CardBody>
			</Card>
		);
	}

	render () {
		return (
			<div>
				{ this.props.cityInfo.map (data => this.renderCity (data)) }
			</div>
		);
	}
}

const returnLineData = (data) => {
	return {
		labels : [, , , , 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,],
		datasets : [{
			label : data.label || 'My First dataset',
			fill : false,
			lineTension : 0.1,
			backgroundColor : 'rgba(75,192,192,0.4)',
			borderColor : 'rgba(75,192,192,1)',
			borderCapStyle : 'butt',
			borderDash : [],
			borderDashOffset : 0.0,
			borderJoinStyle : 'miter',
			pointBorderColor : 'rgba(75,192,192,1)',
			pointBackgroundColor : '#fff',
			pointBorderWidth : 1,
			pointHoverRadius : 5,
			pointHoverBackgroundColor : 'rgba(75,192,192,1)',
			pointHoverBorderColor : 'rgba(220,220,220,1)',
			pointHoverBorderWidth : 2,
			pointRadius : 1,
			pointHitRadius : 10,
			data : data.temp || [65, 59, 80, 81, 56, 55, 40],
		},],
	};
};

const bar = {
	labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'], datasets : [{
		label : 'My First dataset',
		backgroundColor : 'rgba(255,99,132,0.2)',
		borderColor : 'rgba(255,99,132,1)',
		borderWidth : 1,
		hoverBackgroundColor : 'rgba(255,99,132,0.4)',
		hoverBorderColor : 'rgba(255,99,132,1)',
		data : [65, 59, 80, 81, 56, 55, 40],
	},],
};

const doughnut = {
	labels : ['Red', 'Green', 'Yellow',], datasets : [{
		data : [300, 50, 100],
		backgroundColor : ['#FF6384', '#36A2EB', '#FFCE56',],
		hoverBackgroundColor : ['#FF6384', '#36A2EB', '#FFCE56',],
	}],
};

function mapStateToProps (state) {
	console.log ('WeatherList state=>', state);
	return {
		cityInfo : state.cityInfo,
		cityCurrentTemp : state.cityCurrentTemp,
	};
}

export default connect (mapStateToProps) (WeatherList);
