import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchCity } from 'actions';
import { Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupButton } from 'reactstrap';

class SearchBar extends Component {
	constructor (props) {
		super (props);
		this.state = {term : '', searchedTerm : []};
	}

	onInputChange = (e) => {
		this.setState ({term : e.target.value});
	};

	onSearchSubmit = (e) => {
		e.preventDefault ();
		console.log (this.state);
		if (!this.state.searchedTerm.includes (this.state.term)) {
			console.log ('you already searched this term');
			this.props.fetchCity (this.state.term);
			this.setState ({term : '', searchedTerm : [...this.state.searchedTerm, this.state.term]});
		}
	};

	componentDidMount () {
		// test purpose
		this.props.fetchCity ('Hayward');
	}

	render () {
		return (<div>
				<Form className={ 'input-group' } onSubmit={ (e) => {this.onSearchSubmit (e);} }>

					<Col md="12">
						<InputGroup>
							<Input type="text" id="input1-group2" name="input1-group2" placeholder={ '  city name' }
							       onChange={ (e) => this.onInputChange (e) }
							       value={ this.state.term }/>
							<InputGroupButton>
								<Button bsStyle={'primary'} type={ 'submit' }><i className="fa fa-search"></i> Search</Button>
							</InputGroupButton>
						</InputGroup>
					</Col>

				</Form>

				{/*<form className={ 'input-group' } onSubmit={ (e) => {this.onSearchSubmit (e);} }>*/}
					{/*<input*/}
						{/*style={ {backgroundColor : '#353535', border : 0, color : 'white'} }*/}
						{/*placeholder={ '  city name' }*/}
						{/*onChange={ (e) => this.onInputChange (e) }*/}
						{/*value={ this.state.term }/>*/}
					{/*<span className={ 'input-group-btn' }>*/}
					{/*<Button bsStyle={ 'primary' } type={ 'submit' }>*/}
						{/*Search*/}
					{/*</Button>*/}
				{/*</span>*/}
					{/*<div>*/}
					{/*</div>*/}
				{/*</form>*/}
			</div>
		);
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCity}, dispatch);
}

SearchBar.propType = {
	fetchCity : PropTypes.object.isRequired,
};

export default connect (null, mapDispatchToProps) (SearchBar);
