import React from 'react';
import InputForm from './inputForm.js';
import { getCountries } from '../models/countryLookup.js'

/**
* Top level component for the application
*/
export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			loading: false,
			error: ""
		}
	}

	handleSubmit(input,searchByOpt) {
		event.preventDefault()
		if(!input) {
			return window.alert("Please enter something to search by")
		} 

		this.setState({loading: true})
		getCountries(input,searchByOpt)
		.then((data) => {
			if(data.ok === false) this.setState({countries: [], loading: false, error: data.status})
			else this.setState({countries: data, loading: false})
		}
		)
		.catch((error) => {
			this.setState({countries: [], loading: false, error: error})
			console.log("Error submitting form: ",error)
			})
	}

	render() {
		return (
			<div>
				<InputForm handleSubmit={this.handleSubmit.bind(this)}/>
			</div>
			)
	}
}