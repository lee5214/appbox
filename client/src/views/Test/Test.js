import React, { Component } from 'react';
import axios from 'axios';
import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	Card,
	Col,
	DropdownButton,
	MenuItem,
	Row,
	SlimProgressBar,
	SplitButton,
	StarRating,
	Table,
	Tabs,
	Thumbnail,
	Timeline,
	Tooltip,
} from 'components/';
import { ProgressBar } from 'react-bootstrap';
import { Colors } from 'consts';


import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import styled from 'styled-components';

const ProgressBar2 = styled.a`
		    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-size: 40px 40px;
	`;


class Test extends Component {
	state = {quote : ''};

	async getQuote () {
		const quote = await axios.get ('https://api.github.com/zen');
		this.setState ({quote : quote.data});
	}

	componentDidMount () {
		this.getQuote ();
	}

	render () {
		return (
			<div>
				<Row>
					<h2>"{ this.state.quote }"</h2>
				</Row>
				<Row>
					<Col lg={ 12 }>
						<p>
							Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible
							progress bars.
						</p>
						<Row>
							<Col lg={ 4 }>
								<h5>Basic Example</h5>
								<p>
									Default progress bar.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<ProgressBar now={ 60 }/>
							</Col>
							<Col lg={ 4 }>
								<h5>With Label</h5>
								<p>
									Add <kbd>label</kbd> prop to display a percentage indicator inside the Progress Bar
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<ProgressBar now={ 60 } label='60%'/>
							</Col>
							<Col lg={ 4 }>
								<h5>Minimal Width</h5>
								<p>
									To ensure that the label text remains legible even for low percentages, consider
									adding a
									<kbd>min-width</kbd> to the progress bar.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<ProgressBar now={ 10 } label='10%' style={ {minWidth : '30px'} }/>
							</Col>
						</Row>
						<Row>
							<Col lg={ 4 }>
								<h5>Contextual Alternatives</h5>
								<p>
									Progress bars uses <kbd>bsStyle</kbd> prop for applying color.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<ProgressBar now={ 40 } bsStyle='success'/>
								<ProgressBar now={ 25 } bsStyle='info'/>
								<ProgressBar now={ 60 } bsStyle='warning'/>
								<ProgressBar now={ 80 } bsStyle='danger'/>
							</Col>
							<Col lg={ 4 }>
								<h5>Striped</h5>
								<p>
									Uses a gradient to create a striped effect. Not available in IE9 and below.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<ProgressBar now={ 40 } striped bsStyle='success'/>
								<ProgressBar now={ 25 } striped bsStyle='info'/>
								<ProgressBar now={ 60 } striped bsStyle='warning'/>
								<ProgressBar now={ 80 } striped bsStyle='danger'/>
							</Col>
							<Col lg={ 4 }>
								<div>
									<h5>Animated</h5>
									<p>
										Add <kbd>active</kbd> prop to a striped Progress Bar to animate the stripes
										right to left. Not
										available in IE9 and below.
									</p>
									<p className="small text-uppercase m-t-2">
										<strong>Example</strong>
									</p>
									<ProgressBar now={ 45 } striped active/>
								</div>
								<div>
									<h5>Stacked</h5>
									<p>
										Nest <kbd>Progress Bar</kbd>s to stack them.
									</p>
									<p className="small text-uppercase m-t-2">
										<strong>Example</strong>
									</p>
									<ProgressBar>
										<ProgressBar striped bsStyle="success" now={ 35 } key={ 1 }/>
										<ProgressBar bsStyle="warning" now={ 20 } key={ 2 }/>
										<ProgressBar striped active bsStyle="danger" now={ 10 } key={ 3 }/>
									</ProgressBar>
								</div>
							</Col>
						</Row>
						<Row>
							<Col lg={ 4 }>
								<h5>Slim 3px Version</h5>
								<p>
									Use <kbd>SlimProgressBar</kbd> component for a slim alternative.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<SlimProgressBar now={ 60 }/>
							</Col>
							<Col lg={ 4 }>
								<h5>Slim 6px Version</h5>
								<p>
									Set <kbd>size</kbd> prop to <kbd>medium</kbd> for a 6px version.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<SlimProgressBar now={ 60 } size='medium'/>
							</Col>
							<Col lg={ 4 }>
								<h5>Slim 9px Version</h5>
								<p>
									Set <kbd>size</kbd> prop to <kbd>large</kbd> for a 9px version.
								</p>
								<p className="small text-uppercase m-t-2">
									<strong>Example</strong>
								</p>
								<SlimProgressBar now={ 60 } size='large'/>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row>
					<Col lg={ 12 }>
						{ /*-----------Default-------------*/ }
						<h4>Colors Options</h4>
						<p>
							Use the button component to add a button and style it using the <kbd>bsStyle</kbd> property.
						</p>
						<p className="small text-uppercase m-t-2">
							<strong>Examples Default</strong>
						</p>
						<Button bsStyle='primary'>Primary</Button>&nbsp;
						<Button bsStyle='success'>Success</Button>&nbsp;
						<Button bsStyle='info'>Info</Button>&nbsp;
						<Button bsStyle='warning'>Warning</Button>&nbsp;
						<Button bsStyle='danger'>Danger</Button>&nbsp;
						<Button bsStyle='default'>Default</Button>&nbsp;
						<Button bsStyle='link'>Link</Button>&nbsp;

						<p className="small text-uppercase m-t-2">
							<strong>Examples Custom Colors</strong>
						</p>
						<Button bsStyle='custom' customColor={ Colors.brandCerulean }>Cerulean</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandCuriousBlue }>Curious Blue</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandEndaveour }>Endaveour</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandMinsk }>Minsk</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandEminence }>Eminence</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandVioletEggplant }>Violet
							Eggplant</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandDodgerBlue }>Dodger Blue</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandHeliotrope }>Heliotrope</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandPerfume }>Perfume</Button>&nbsp;

						<p className="small text-uppercase m-t-2">
							<strong>Examples Gray Colors</strong>
						</p>
						<Button bsStyle='custom' customColor={ Colors.grayDarker }>Gray Darker</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.grayDark }>Gray Dark</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.gray }>Gray</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.grayLight }>Gray Light</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.grayLighter }>Gray Lighter</Button>&nbsp;

						{ /*-----------Outline-------------*/ }
						<h4 className="m-t-3">Colors Outline Options</h4>
						<p>To an existing button, add a property called <kbd>outline</kbd></p>

						<p className="small text-uppercase m-t-2">
							<strong>Examples Default Outline</strong>
						</p>
						<Button bsStyle='primary' outline>Primary</Button>{ ' ' }
						<Button bsStyle='success' outline>Success</Button>{ ' ' }
						<Button bsStyle='info' outline>Info</Button>{ ' ' }
						<Button bsStyle='warning' outline>Warning</Button>{ ' ' }
						<Button bsStyle='danger' outline>Danger</Button>{ ' ' }

						<p className="small text-uppercase m-t-2">
							<strong>Examples Custom Colors Outline</strong>
						</p>
						<Button bsStyle='custom' customColor={ Colors.brandCerulean } outline>Cerulean</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandCuriousBlue } outline>Curious
							Blue</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandEndaveour } outline>Endaveour</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandMinsk } outline>Minsk</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandEminence } outline>Eminence</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandVioletEggplant } outline>Violet
							Eggplant</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandDodgerBlue } outline>Dodger
							Blue</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandHeliotrope }
						        outline>Heliotrope</Button>&nbsp;
						<Button bsStyle='custom' customColor={ Colors.brandPerfume } outline>Perfume</Button>&nbsp;

					</Col>
				</Row>
			</div>
		);
	}
}

export default Test;
