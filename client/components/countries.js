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
			<div id="summary" className="country">
				<h2>{"Total: " + this.props.countries.length}</h2>
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
					<div className="regionInfo">
						<div className="subregions">
							{this.renderSubregions(this.props.regions[i].subregions)}
						</div>
						<img className="regionImg" src={'assets/' + i + ".png"} onerror='this.style.display = "none"'/>
					</div>
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