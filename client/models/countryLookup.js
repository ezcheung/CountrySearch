let endpoints= {
	"Name": "name",
	"Full Name": "fullname",
	"Code": "code"
}

export function getCountries(input,searchByOpt){
	let endpoint=endpoints[searchByOpt];
	
	return fetch(`/countries/${endpoint}/?q=${input}`)
	.then(response => {
		return response.json();
	})
	.then(data => {
		if(!data.ok) {
			throw new Error(data.error)
		}
		return data.data
	})
}

