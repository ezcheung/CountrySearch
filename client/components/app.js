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
			error: ""
		}
	}

	handleSubmit(input,searchByOpt) {
		event.preventDefault()
		if(!input) {
			return window.alert("Please enter something to search by")
		} 

		this.setState({loading: true, error: ""})
		getCountries(input,searchByOpt)
		.then((data) => {
			console.log("Data: ", data);
			if(data.ok === false) this.setState({countries: [], regions: {},loading: false, error: data.status})
			else this.setState({countries: data.countries, regions: data.regions, loading: false})
		}
		)
		.catch((error) => {
			this.setState({countries: [], regions: {}, loading: false, error: error})
			console.log("Error submitting form: ",error)
			})
	}

	renderCountries() {
		if(this.state.loading || this.state.error || this.state.countries.length <= 0) return null;
		else return <Countries countries={this.state.countries} regions={this.state.regions}/>
	}

	render() {
		return (
			<div>
				<InputForm handleSubmit={this.handleSubmit.bind(this)}/>
				{this.renderCountries()}
			</div>
			)
	}
}