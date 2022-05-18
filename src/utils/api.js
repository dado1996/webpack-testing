const API = process.env.API;

async function getRandomPerson() {
	const response = await fetch(API);
	const result = await response.json();
	return result;
}

export default getRandomPerson;