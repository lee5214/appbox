import React, { Component } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Badge, Card, CardBody, CardColumns, CardHeader, Col, Row } from 'reactstrap';
import 'weather-icons/css/weather-icons.css';
import ForecastEmbed from './ForecastEmbed';
import { fetchUserLocation } from '../../../utils';
import { DataList } from '../components';
import {PricingTable, PricingTableClean} from 'components/_Composite/PricingTables';
import moment from 'moment';
import uid from 'uuid';
import classes from './City.scss'


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

	renderLineChart ({tempList, dateList, label}) {
		return (
			<Card>
				<CardHeader className={classes.chartHeader}>
					<h6>Tempature Forecast - Range: <kbd>5 days</kbd> Frequency: <kbd>3 hours</kbd></h6>

					{/*<div className="card-actions">
						<a href="">
						<small className="text-muted">X</small>
						</a>
					</div>*/}
				</CardHeader>
				<CardBody>
					<div className="chart-wrapper">
						<Line
							height={ 100 }
							data={ {
								labels : dateList || [1, 2, 1, 1, 1, 1, 1, 1, 1],
								datasets : [{
									label : label || 'My First dataset',
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
									data : tempList || [65, 59, 80, 81, 56, 55, 40],
								},],
							}
							}
							options={
								{
									maintainAspectRatio : true,

									// legend : {
									//    display : false,
									// },
									// scales : {
									//    xAxes : [{
									//       gridLines : {
									// 	      color : 'transparent',
									// 	      zeroLineColor : 'transparent',
									//       },
									//       ticks : {
									// 	      fontSize : 2,
									// 	      fontColor : 'transparent',
									//       },
									//
									//    }],
									//    yAxes : [{
									//       display : false,
									//       ticks : {
									// 	      display : false,
									// 	      //min : Math.min.apply (Math, cardChartData1.datasets[0].data) - 5,
									// 	      //max : Math.max.apply (Math, cardChartData1.datasets[0].data) + 5,
									//       },
									//    }],
									// },
									// elements : {
									//    line : {
									//       borderWidth : 1,
									//    },
									//    point : {
									//       radius : 4,
									//       hitRadius : 10,
									//       hoverRadius : 4,
									//    },
									// },
								}
							}

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
		if (!this.props.info) {
			return <h1>Loading!!!!</h1>;
		}

	}


	render () {

		const {dt, city, list, main : {humidity, pressure}, name, sys, visibility, weather, coord, wind} = this.props.info;
		const label = city.name;
		// get forecast temperature in array
		const tempList = list.map ((item) => item.main.temp);
		// split data I need, pass to charts props
		const dateList = list.map ((item) => moment (item.dt_txt).local ().format ('MM/DD HH:MM'));
		// const obj = list.map ((item) => {
		// 	//console.log('date==>', moment(item.dt).format('MM/DD HH'));
		// 	var tempDate = moment(item.dt).format('MM/DD HH')
		// 	return {
		//
		// 		date : tempDate,
		// 		temp : item.main.temp
		// 	};
		// });
		//console.log ('obj=>', obj);
		const priceData = {
			id : uid.v4 (),
			//type : 'Basic',
			bsStyle : 'info',
			description : '',
			//price : '',
			capabilities : [
				{key : 'Country', value : sys.country},
				{key : 'Pressure', value : pressure},
				{key : 'Humidity', value : humidity},
				{key : 'Visibility', value : visibility},
				{key : 'Data Storage', value : '1GB'},
			],
		};

		// TODO extends style rework
		return (
			<div>
				<Row className={classes.embed}>
					<Col xs={12} lg={12} >
					<ForecastEmbed lat={ coord.lat } lon={ coord.lon } name={ name }/>
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
					</Col>

					<Col xs={12} lg={3}>
						<PricingTableClean { ...priceData }/>
					</Col>
					<Col>
						{ this.renderLineChart ({tempList : tempList, dateList : dateList, label : label}) }
					</Col>
				</Row>

				{/*<CardColumns className="cols-2">
					{ this.renderBarChart () }
					{ this.renderDoughnutChart () }
				</CardColumns>*/}
			</div>
		);
	};
}

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
