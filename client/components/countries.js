import React from 'react';
import Country from './country.js'

export default class Countries extends React.Component {

	constructor(props) {
		super(props);
	}

	renderCountries() {
		return this.props.countries.map((country,i) => <Country country={country} key={"country" + i}/>)
	}

	renderRegions() {

	}

	render() {
		return (
			<div id="countrySection">
		  		{this.renderCountries()}
			</div>
		)
	}
}