import React from 'react';
import InputForm from './inputForm.js';

/**
* Top level component for the application
*/
export default class App extends React.Component {

	constructor(props) {
		super(props);

	}

	handleSubmit(input,searchByOpt) {
		console.log("Input: ",input);
		console.log("searchByOpt: ",searchByOpt);
	}

	render() {
		return (
			<InputForm handleSubmit={this.handleSubmit}/>
			)
	}
}