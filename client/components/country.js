import React from 'react';

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

	renderFlag() {
		if(this.props.country.flag) {
			return <img className="flag" src={this.props.country.flag} alt={this.props.country.name + " Flag"}/>
		}
	}

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
					<div className="content">
						<b className="label">{labels[i]}</b>
						{this.renderSingleDataPiece(i)} 
					</div>
				)
			}
		}

		return content;
	}

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