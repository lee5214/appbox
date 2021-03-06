import React, { Component } from 'react';
//wrapper for chartjs
import { Line } from 'react-chartjs-2';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {InfoList} from 'components/'
import 'weather-icons/css/weather-icons.css';
import ForecastEmbed from './ForecastEmbed';
import { fetchUserLocation } from '../../../utils';
import moment from 'moment';
import uid from 'uuid';
import styles from './City.scss';
import NYTNewsList from './NYTNewsList';

class CityDetail extends Component {
	renderLineChart = ({tempList, dateList, label}) => {
		return (
			<Card className={ styles.chart }>
				<CardHeader className={ styles.chartHeader }>
					<h6>Tempature Forecast - Range: <kbd>5 days</kbd> Frequency: <kbd>3 hours</kbd></h6>

					{ /* <div className="card-actions">
					 <a href="">
					 <small className="text-muted">X</small>
					 </a>
					 </div>*/ }
				</CardHeader>
				<CardBody>
					<div className="chart-wrapper">
						<Line
							height={ 100 }
							data={ {

								labels : dateList || [],
								datasets : [ {
									label : label || 'My First dataset',
									fill : false,
									lineTension : 0.1,
									backgroundColor : '#21a8d8',
									borderColor : '#21a8d8',
									borderCapStyle : 'butt',
									borderDash : [],
									borderDashOffset : 0.0,
									borderJoinStyle : 'miter',
									pointBorderColor : '#21a8d8',
									pointBackgroundColor : '#fff',
									pointBorderWidth : 1,
									pointHoverRadius : 5,
									pointHoverBackgroundColor : '#21a8d8',
									pointHoverBorderColor : '#21a8d8',
									pointHoverBorderWidth : 2,
									pointRadius : 1,
									pointHitRadius : 10,
									data : tempList || [],
								}, ],
							} }
							options={
								{
									maintainAspectRatio : true,
								}
							}

						/>
					</div>
				</CardBody>
			</Card>
		);
	};

	componentWillMount () {
		fetchUserLocation ();
		if (!this.props.info) {
			return <h1>Loading!!!!</h1>;
		}

	};


	render () {
		const {city, list, main : {humidity, pressure}, name, sys, visibility, coord} = this.props.info.cityWeather;
		const {docs} = this.props.info.cityNews;
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
		// console.log ('obj=>', obj);
		const infoListData = {
			id : uid.v4 (),
			// type : 'Basic',
			// bsStyle : 'info',
			description : '',
			// price : '',
			capabilities : [
				{key : 'Country', value : sys.country},
				{key : 'Pressure', value : pressure},
				{key : 'Humidity', value : humidity},
				{key : 'Visibility', value : visibility},
			],
		};

		// TODO extends style rework
		return (
			<Row className={ 'mb-5' }>
				<Col xs={ 12 } lg={ 12 }>
					<Card body outline color="transparent">
						<Row className={ 'mt-5' }>
							<Col xs={ 12 }>
								<h1 className={ 'text-center font-weight-bold' }>{ city.name }</h1>
							</Col>
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
									<Badge
										color="primary">{ coord.lon }
									</Badge>
								</div>
							</Col>
						</Row>
						<Row>
							<div className={styles.iframeMask} />
							<ForecastEmbed lat={ coord.lat } lon={ coord.lon } name={ name }/>
						</Row>
					</Card>
				</Col>
				<Col xs={ 12 } lg={ 3 } className={ 'd-flex' }>
					<InfoList { ...infoListData }/>
				</Col>
				<Col xs={ 12 } lg={ 9 }>
					{ this.renderLineChart ({tempList, dateList, label : city.name}) }
				</Col>
				<Col>
					<NYTNewsList newsList={ docs }/>
				</Col>
			</Row>
		);
	};
}

const bar = {
	labels : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ], datasets : [ {
		label : 'My First dataset',
		backgroundColor : 'rgba(255,99,132,0.2)',
		borderColor : 'rgba(255,99,132,1)',
		borderWidth : 1,
		hoverBackgroundColor : 'rgba(255,99,132,0.4)',
		hoverBorderColor : 'rgba(255,99,132,1)',
		data : [ 65, 59, 80, 81, 56, 55, 40 ],
	}, ],
};

const doughnut = {
	labels : [ 'Red', 'Green', 'Yellow', ], datasets : [ {
		data : [ 300, 50, 100 ],
		backgroundColor : [ '#FF6384', '#36A2EB', '#FFCE56', ],
		hoverBackgroundColor : [ '#FF6384', '#36A2EB', '#FFCE56', ],
	} ],
};

export default CityDetail;
