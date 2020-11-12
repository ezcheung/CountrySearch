import React from 'react';
import Country from './country.js'

/**
* Component to hold all country information, both individual country data and the summary report
*/
export default class Countries extends React.Component {

	constructor(props) {
		super(props);
	}

	/**
	* Take the array of countries and return Country components
	*/
	renderCountries() {
		return this.props.countries.map((country,i) => <Country country={country} key={"country" + i}/>)
	}

	/**
	* Renders the summary by region
	*/
	renderSummary() {
		return (
			<div id="summary" className="country">
				<h2>{"Total: " + this.props.countries.length}</h2>
				{this.renderRegions()}
			</div>
		)
	}

	/**
	* Returns an array of JSX for each region in the country array
	*/
	renderRegions() {
		let regArr = [];
		for(let i in this.props.regions) {
			regArr.push(
				<div className="region" key={"reg" + i}>
					<h3>{i + ": " + this.props.regions[i].count}</h3>
					<div className="regionInfo">
						<div className="subregions">
							{this.renderSubregions(this.props.regions[i].subregions)}
						</div>
						<img className="regionImg" src={'assets/' + i + ".png"} onError={e => e.target.style.display='none'}/>
					</div>
				</div>
			)
		}
		return regArr;
	}

	/**
	* Returns an array of JSX for each subregion in the parameter array
	* @param subregions The array of subregions for a given region (this.props.regions[i].subregions)
	*/
	renderSubregions(subregions) {
		let subregArr = [];
		for(let i in subregions) {
			subregArr.push(
				<div className="subregion" key={"subreg" + i}>{i + ": " + subregions[i]}</div>
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