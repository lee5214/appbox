import React from 'react';
import { Card, CardBody, CardColumns, CardHeader, Col, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { Row } from '../../../components/_Common';
import 'weather-icons/css/weather-icons.css';

export default function DataList ({pres, sea, hum, vis}) {
	return (
		<Panel>
			<Row>

			</Row>
			<Col lg={ 12 }>

				<ListGroup>
					<h2>General Info</h2>
					<ListGroupItem>
						Pressure: { pres }
					</ListGroupItem>
					<ListGroupItem>
						Sea Level: { sea }
					</ListGroupItem>
					<ListGroupItem>
						Humidity: { hum }
					</ListGroupItem>
					<ListGroupItem>
						Visibility: { vis }
					</ListGroupItem>
				</ListGroup>
			</Col>
		</Panel>
	);
}
