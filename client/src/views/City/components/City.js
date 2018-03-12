import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import {Loader} from 'components/'
import { CityDetail, SearchBar } from './index';
import PropTypes from 'prop-types';
//import { Colors } from 'remove-consts';

class City extends Component {
	render () {
		return (
			<div className="animated fadeIn container pt-4">
				<Row className={ 'justify-content-center' }>
					<Col xs={ 'auto' }>
						<SearchBar defaultCity={ 'San Francisco' }/>
					</Col>

				</Row>
				{ this.props.cityInfo[ 0 ] ?
					<Row className={ 'justify-content-center' }>
						{ this.props.cityInfo.map (info => <CityDetail key={ info.cityWeather.id }
						                                               info={ info }/>) }
					</Row>
					:
					<Loader />
				}
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		cityInfo : state.cityInfo,
	};
}

City.propTypes = {
	cityInfo : PropTypes.array.isRequired,
};

export default connect (mapStateToProps) (City);
