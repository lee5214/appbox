import React, { Component } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Badge, Card, CardBody, CardColumns, CardHeader, Col, Row } from 'reactstrap';
import 'weather-icons/css/weather-icons.css';
import ForecastEmbed from './ForecastEmbed';
import { fetchUserLocation } from '../../../utils';
import { DataList } from '../components';
import PricingTables from "../../Components/PricingTables/PricingTablesDisplay";

import uid from 'uuid';
const priceData = {
	id : uid.v4 (),
	type : 'Basic',
	bsStyle : 'info',
	description : 'Very good to start your business',
	price : 23.00,
	capabilities : [
		{key : 'Android / iOS', value : 'Yes'},
		{key : 'Admin Web Access', value : '85421'},
		{key : 'Appointments', value : 'Yes'},
		{key : 'Import / Export Data', value : 'Yes'},
		{key : 'Data Storage', value : '1GB'},
	],
};

class CityCurrent extends Component {
	renderCurrentTemp (data) {
		// set up a initial state for rendering 'null' when data
		// from async call is not ready
		if (!this.props.info) {
			return <h1>Loading!!!!</h1>;
		}
		return (
			<span>Temp: { data.main.temp }</span>
		);
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
		const time = data.dt;
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
						<Line data={ returnLineData (data.obj) }
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

	componentWillMount () {
		fetchUserLocation ();
	}


	render () {
		const {dt, city, list, main : {humidity, pressure}, name, sys, visibility, weather, coord, wind} = this.props.info;

		const label = city.name;
		// get forecast temperature in array
		const tempList = list.map ((item) => item.main.temp);
		const obj = list.map ((item) => {
			return {dt_txt : item.dt_txt, temp : item.main.temp};
		});
		console.log ('obj=>', obj);

		// TODO extends style rework
		return (
			<div>
				<Row>
					<ForecastEmbed lat={ coord.lat } lon={ coord.lon } name={ name }/>
					<Col>
						<h1 className={ 'text-center font-weight-bold' }>{ city.name }</h1>
						<Row>
							<Col className={ 'text-right' }>
								<div>
									<span className={ 'font-weight-normal' }>Latitude </span>
								</div>
								<div>
									<span className={ 'font-weight-normal' }>Longitude </span>
								</div>
							</Col>
							<Col className={ 'text-left' }>
								<div>
									<Badge
										color="primary">{ coord.lat }
									</Badge>
								</div>
								<div>
									<Badge className={ 'text-left' }
									       color="primary">{ coord.lon }
									</Badge>
								</div>
							</Col>
						</Row>
						<hr/>
					</Col>
				</Row>
				<Row>
					<PricingTables { ...priceData }/>
				</Row>

				<Row>

					<Col xs={ '12' } lg={ '3' }>
						<DataList hum={ humidity } pres={ pressure } vis={ visibility }/>
					</Col>
					<Col>
						{ this.renderLineChart ({obj : obj, tempList : tempList, label : label}) }
					</Col>
				</Row>
				<CardColumns className="cols-2">
					{ this.renderBarChart () }
					{ this.renderDoughnutChart () }
				</CardColumns>
			</div>
		);
	};
}

const returnLineData = (data) => {
	return {
		labels : data.map (i => i.dt_txt),
		datasets : [{
			label : data.label || 'My First dataset',
			fill : false,
			lineTension : 0.4,
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
			data : data.map (i => i.temp) || [65, 59, 80, 81, 56, 55, 40],
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
