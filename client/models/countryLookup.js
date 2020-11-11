let endpoints= {
	"Name": "name",
	"Full Name": "fullname",
	"Code": "code"
}

export function getCountries(input,searchByOpt){
	let endpoint=endpoints[searchByOpt];

	return fetch(`/countries/${endpoint}/?q=${input}`)
	.then(response => {
		if(!response.ok) {
			return response;
		}
		else return response.json();
	})
}

