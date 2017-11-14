import React, { Component } from 'react';
import uid from 'uuid';
import hash from 'object-hash';
import _ from 'lodash';
import numeral from 'numeral';

import { Button, Col, Divider, Label, Panel, Row, Table } from '../../../components/_General';


import classes from './PricingTables.scss';
import PricingTable from './index'


// PricingTable.propTypes = PricingTableClean.propTypes = {
// 	description : PropTypes.string.isRequired,
// 	price : PropTypes.number.isRequired,
// 	type : PropTypes.string.isRequired,
// 	bsStyle : PropTypes.string.isRequired,
// 	capabilities : PropTypes.array.isRequired,
// 	active : PropTypes.bool,
// };

class PricingTables extends Component {

	render () {

		const tablesData = [
			{
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
			},
			{
				id : uid.v4 (),
				type : 'Premium',
				bsStyle : 'primary',
				description : 'Our most popular package',
				price : 48.90,
				capabilities : [
					{key : 'Android / iOS', value : 'Yes'},
					{key : 'Admin Web Access', value : '14931'},
					{key : 'Appointments', value : 'Yes'},
					{key : 'Import / Export Data', value : 'Yes'},
					{key : 'Data Storage', value : '2GB'},
				],
				active : true,
			},
			{
				id : uid.v4 (),
				type : 'Pro',
				bsStyle : 'warning',
				description : 'When you have a lot of customers to take care of',
				price : 79.99,
				capabilities : [
					{key : 'Android / iOS', value : 'Yes'},
					{key : 'Admin Web Access', value : '35415'},
					{key : 'Appointments', value : 'Yes'},
					{key : 'Import / Export Data', value : 'Yes'},
					{key : 'Data Storage', value : '3GB'},
				],
			},
			{
				id : uid.v4 (),
				type : 'Advanced',
				bsStyle : 'danger',
				description : 'For the most advanced users and teams',
				price : 123.00,
				capabilities : [
					{key : 'Android / iOS', value : 'Yes'},
					{key : 'Admin Web Access', value : '51738'},
					{key : 'Appointments', value : 'Yes'},
					{key : 'Import / Export Data', value : 'Yes'},
					{key : 'Data Storage', value : '4GB'},
				],
			},
		];

		function add (data) {
			console.log(data.type)
		}
		return (
			<Row>
				<Col lg={ 12 }>
					<Row>
						{
							_.map(tablesData, data => (
								<Col md={ 3 } key={ data.id }>
									<PricingTable {...data} />
								</Col>
							))
						}
					</Row>
				</Col>
			</Row>
		);
	}
}

export default PricingTables;
export {
	PricingTable,
};
