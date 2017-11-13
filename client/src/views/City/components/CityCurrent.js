import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import 'weather-icons/css/weather-icons.css';

class CityCurrent extends Component {
	renderCurrentTemp (data) {
		// set up a initial state for rendering 'null' when data
		// from async call is not ready
		if (!this.props.info) {
			return <h1>Loading!!!!</h1>;
		}
		return <h1 key={ data.sys.id }>Temp: { data.main.temp }</h1>;

	}

	renderCurrentWeatherIcon (data) {
		if (!data) {
			return <h1>Loading Icon</h1>;
		}
		switch (data.weather[0].main) {
			case 'Fog':
				return (<i className='wi wi-day-fog'/>);
			case 'Clouds':
				return (<i className='wi wi-day-cloudy'/>);
			case 'Clear':
				return (<i className='wi wi-day-sunny'/>);
			default:
				return <h1>Loading</h1>;
		}

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
		)
			;
	}

	render () {
		const label = this.props.info.city.name;
		// get forecast temperature in array
		const temp = this.props.info.list.map ((temp) => temp.main.temp);

		// TODO extends style rework
		return (
			<CardColumns className="cols-2" key={ this.props.info.city.id }>
				{ this.renderCurrentTemp (this.props.info) }
				{ this.renderCurrentWeatherIcon (this.props.info) }
				{ this.renderLineChart ({temp : temp, label : label}) }
				{ this.renderBarChart () }
				{ this.renderDoughnutChart () }
			</CardColumns>
		);
	};
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

export default CityCurrent;
