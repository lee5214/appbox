import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCity, fetchCurrentCityTemp } from '../../../actions';

class SearchBar extends Component {
	constructor (props) {
		super (props);

		this.state = {term : ''};
	}

	onInputChange = (e) => {
		this.setState ({term : e.target.value});
	};

	onSearchSubmit = (e) => {
		e.preventDefault ();
		this.props.fetchCity (this.state.term);
		this.props.fetchCurrentCityTemp (this.state.term);
		this.setState ({term : ''});
	};

	componentDidMount () {
		// test purpose
		this.props.fetchCity ('Hayward');
		this.props.fetchCurrentCityTemp ('Hayward');
	}

	render () {
		return (
			<form className={ 'input-group' } onSubmit={ (e) => {this.onSearchSubmit (e);} }>
				<input
					placeholder={ 'input your target city' }
					onChange={ (e) => this.onInputChange (e) }
					value={ this.state.term }/>
				<span className={ 'input-group-btn' }>
					<Button
						outline
						color={ 'primary' }
						type={ 'submit' }>
						Search
					</Button>
				</span>
				<div>
					{ this.state.term }
				</div>
			</form>
		);
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCity, fetchCurrentCityTemp}, dispatch);
}

export default connect (null, mapDispatchToProps) (SearchBar);
