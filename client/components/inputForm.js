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

	handleInputChange(event) {
		this.setState({input: event.target.value});
	}

	handleSearchByChange(event) {
		this.setState({optSearchBy: event.target.value})
	}
	
	searchByBtn(name) {
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
			<form onSubmit={() => this.props.handleSubmit(this.state.input,this.state.optSearchBy)}>
				<label id="input">
					<input type="text" value={this.state.input} onChange={this.handleInputChange.bind(this)}/>
				</label>
				<div id="searchByBtns">
					{this.searchByBtn("Name")}
					{this.searchByBtn("Full Name")}
					{this.searchByBtn("Code")}
				</div>
				<input className="button" id="btnSub" type="submit" value="Search"/>
			</form>
			)
	}
}