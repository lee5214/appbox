import React from 'react';
import hash from 'object-hash';
import _ from 'lodash';
import numeral from 'numeral';

import { Button, Divider, Label, Table } from 'components/_Common';
import { Colors } from 'consts';
import classes from './PricingTables.scss';

const PricingTableClean = props => (
	<div className={ classes.tableClean }>
		<Label outline bsStyle={ props.bsStyle }>
			{ (props.type ? props.type : '') }
		</Label>
		<div>
			{ props.price ? (
				<div>
					<p className={ classes.price }>
						${ numeral (props.price).format ('0.00') }
					</p>
					<p>
						/ month
					</p>
				</div>) : '' }
		</div>
		<Divider textPosition='center'>
			{ (props.description) ? 'Description' : '' }
		</Divider>
		<p className={ classes.description }>
			{ props.description }
		</p>
		<Divider textPosition='center'>
			Details
		</Divider>
		<Table className={ classes.capabilitiesTable }>
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
		{ (props.button ?
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
				: ('')
		)
		}
	</div>
);

export default PricingTableClean;
