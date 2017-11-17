import React from 'react';
import hash from 'object-hash';
import _ from 'lodash';
import numeral from 'numeral';

import { Button, Divider, Label, Panel, Table } from 'components/_Common';
import classes from './PricingTables.scss';


const PricingTable = props => (
	<Panel
		header={
			<div
				className={ classes.header }

			>
				<Label >
					{ props.type }
				</Label>
				<div>
					<p className={ classes.price }>
						${ numeral (props.price).format ('0.00') }
					</p>
					<p>
						/ month
					</p>
				</div>
			</div>
		}
	>
		<Divider>
			Description
		</Divider>
		<p className={ classes.description }>
			{ props.description }
		</p>
		<Divider>
			Capabilities
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
		<Button block>
			Upgrade
		</Button>
	</Panel>
);

export default PricingTable;
