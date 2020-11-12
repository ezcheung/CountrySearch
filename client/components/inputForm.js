import React from 'react';

/**
* Component for input form to search for a country
*/

export default class InputForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Free-text search input
			input: "",
			// Selected radio button for what to search by
			optSearchBy: "Name"
		}
	}

	/*
	* Event handler for when a user enters into the text box
	*/
	handleInputChange(event) {
		this.setState({input: event.target.value});
	}

	/*
	* Event handler for when the radio buttons are selected
	*/
	handleSearchByChange(event) {
		this.setState({optSearchBy: event.target.value})
	}
	
	/**
	* Gets the JSX to render a radio button of a given value
	* @param name the value of the radio button
	*/
	renderRadio(name) {
		return (
			<label className="radio">
				<input 
					type="radio"
					value={name}
					checked={this.state.optSearchBy === name}
					onChange={this.handleSearchByChange.bind(this)}
				/>
				{name}
			</label>
		)
	}

	render() {
		return (
			<div id="inputForm">
				<h2 id="inputHeader">Search for Countries:</h2>
				<form onSubmit={() => this.props.handleSubmit(this.state.input,this.state.optSearchBy)}>
					<label>
						<input id="input" type="text" value={this.state.input} onChange={this.handleInputChange.bind(this)}/>
					</label>
					<div id="searchByBtns">
						{this.renderRadio("Name")}
						{this.renderRadio("Full Name")}
						{this.renderRadio("Code")}
					</div>
					<input className="button" id="btnSub" type="submit" value={"Search by " + this.state.optSearchBy}/>
				</form>
			</div>
			)
	}
}