import React from 'react';
import Country from './country.js'

export default class Countries extends React.Component {

	constructor(props) {
		super(props);
	}

	renderCountries() {
		return this.props.countries.map((country,i) => <Country country={country} key={"country" + i}/>)
	}

	renderSummary() {
		return (
			<div id="summary">
				<h2>Summary</h2>
				<div>{"Total number of countries: " + this.props.countries.length}</div>
				{this.renderRegions()}
			</div>
		)
	}

	renderRegions() {
		let regArr = [];
		for(let i in this.props.regions) {
			regArr.push(
				<div className="region">
					<h3>{i + ": " + this.props.regions[i].count}</h3>
					{this.renderSubregions(this.props.regions[i].subregions)}
				</div>
			)
		}
		return regArr;
	}

	renderSubregions(subregions) {
		let subregArr = [];
		for(let i in subregions) {
			subregArr.push(
				<div className="subregion">{i + ": " + subregions[i]}</div>
			)
		}
		return subregArr;
	}

	render() {
		return (
			<div id="countrySection">
		  		{this.renderCountries()}
		  		{this.renderSummary()}
			</div>
		)
	}
}