import React from 'react';
import hash from 'object-hash';
import _ from 'lodash';
import numeral from 'numeral';

import { Button, Divider, Label, Table } from '../../../components/_General';
import { Colors } from './colors';
import classes from './PricingTables.css';

const PricingTableClean = props => (
	<div className={ 'tableClean' }>
		<Label outline bsStyle={ props.bsStyle }>
			{ props.type }
		</Label>
		<div>
			<p className={ 'price' }>
				${ numeral (props.price).format ('0.00') }
			</p>
			<p>
				/ month
			</p>
		</div>
		<Divider textPosition='center'>
			Description
		</Divider>
		<p className={ 'description' }>
			{ props.description }
		</p>
		<Divider textPosition='center'>
			Capabilities
		</Divider>
		<Table className={ 'capabilitiesTable ' }>
			<tbody>
			{
				_.map (props.capabilities, capability => (
					<tr key={ hash (capability) }>
						<td>
							{ capability.key }
						</td>
						<td>
							{ capability.value }
						</td>
					</tr>
				))
			}
			</tbody>
		</Table>
		{
			(props.active ? (
				<Button block disabled bsStyle='primary'>
					<i className='fa fa-check m-r-1'></i>
					Selected
				</Button>
			) : (
				<Button block>
					Upgrade
				</Button>
			))
		}
	</div>
);

export default PricingTableClean;
