import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decoded() {
	const listUniqueID = [];
	const newEncoded = encoded.map((elem) => {
		const newObject = elem;
		console.log(newObject)
		Object.keys(elem).forEach((keys) => {
			const key = elem[keys];

			if (translations[key]) {
				newObject[keys] = translations[key];
			} else if (Number.isFinite(key)) {
				listUniqueID.push({uniqueID: key});
			}
		})

		return newObject
	})
	console.log(listUniqueID)
	return newEncoded
}

console.log(decoded())
