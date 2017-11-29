import React from 'react';
import hash from 'object-hash';
import _ from 'lodash';

import { Button, Divider, Label, Table } from 'components';
import { Colors } from 'consts';
import classes from './InfoList.scss';

const InfoList = (props) => {
	return (
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
	);
};

export default InfoList;
