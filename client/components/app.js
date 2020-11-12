import React from 'react';
import InputForm from './inputForm.js';
import Countries from './countries.js';
import { getCountries } from '../models/countryLookup.js'

/**
* Top level component for the application
*/
export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			regions: {},
			loading: false,
			errorCode: "",
			errorMessage: ""
		}
	}

	/**
	* Function called when form is submitted
	*/
	handleSubmit(input,searchByOpt) {

		//Prevent default behavior of forms - don't reload page or reset state
		event.preventDefault()

		if(!input) {
			return window.alert("Please enter something in the box to search for")
		} 

		this.setState({loading: true, error: ""})

		getCountries(input,searchByOpt)
		.then((data) => {
			if(data.ok === false) this.setState({countries: [], regions: {},loading: false, errorCode: data.status, errorMessage: data.statusText})
			else {
				this.setState({countries: data.countries, regions: data.regions, loading: false, errorCode: data.countries.length ? "" : 404})
			}
		}
		)
		.catch((error) => {
			this.setState({countries: [], regions: {}, loading: false, errorCode: error})
			console.log("Error submitting form: ",error)
			})
	}

	/**
	* Render the content displayed below the input form
	* This could be the loading image, countries, or an error, based on the current state of the app
	*/
	renderContent() {
		if(this.state.loading) return (
				<div id="loading">
					<b>Loading...</b>
					<br/>
					<img src='assets/flag.png' id="loadingImg"/>
				</div>
			)

		// Bad request - no countries found for the inputs
		if(this.state.errorCode >= 400 && this.state.errorCode < 500) {
			return <div className="error">No countries were found. Try searching for something else!</div>
		}

		// Non-400 errors -- something went wrong with the server or we were redirected
		if(this.state.errorCode) {
			let errMsg = "An error occurred when searching for countries" 
			if(this.state.errorMessage) errMsg += " - " + this.state.errorCode + ": " + this.state.errorMessage;

			return <div className="error">{errMsg}</div>
		}

		if(this.state.countries.length <= 0) return null;
		
		return <Countries countries={this.state.countries} regions={this.state.regions}/>
	}

	render() {
		return (
			<div id="app">
				<InputForm handleSubmit={this.handleSubmit.bind(this)}/>
				{this.renderContent()}
			</div>
			)
	}
}