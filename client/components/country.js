import React from 'react';

/**
* Component for an individual country's information
*/
export default class Country extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if(!this.props.country || !this.props.country.name) return null;

		return (
			<div className="country">
				{this.renderHeader()}
				{this.renderContent()}
			</div>
		)
	}

	/**
	* Gets the JSX to render for the country's header, including its name and flag image
	*/
	renderHeader() {
		return (
			<div className="cntHeader">
				<h2 className="cntName">
					{this.props.country.name}
				</h2>
				{this.renderFlag()}
			</div>
		)
	}

	/**
	* Gets the JSX to render a country's flag
	*/
	renderFlag() {
		if(this.props.country.flag) {
			return <img className="flag" src={this.props.country.flag} alt={this.props.country.name + " Flag"}/>
		}
	}

	/**
	* Loops through the information we want to display for a country, and returns an array of JSX to render
	* If a given piece of data for a country is not populated, we will not return anything for it
	*/
	renderContent() {
		let content = [];
		let labels = {
			alpha2Code: "Alpha 2 Code: ",
			alpha3Code: "Alpha 3 Code: ",
			region: "Region: ",
			subregion: "Subregion: ",
			population: "Population: ",
			languages: "Languages: "
		}

		for(let i in labels) {
			if(this.props.country[i]) {
				content.push(
					<div className="content" key={this.props.country.name + i}>
						<b className="label">{labels[i]}</b>
						{this.renderSingleDataPiece(i)} 
					</div>
				)
			}
		}

		return content;
	}

	/**
	* Gets the JSX to render for a given piece of data
	* If the data we want is languages, this will return an array of JSX for each language
	* @param data the key of the data we want to render, e.g. alpha2Code, languages
	*/
	renderSingleDataPiece(data){
		if(data === "languages") {
			return (
				<div className="langs">
					{
						this.props.country.languages.map((lang, i) => 
						<div className="info" key={"lang" + i}>{lang}</div>)
					}
				</div>
			)
		}
		else {
			return <div className="info">{this.props.country[data]}</div>
		}
	}
}