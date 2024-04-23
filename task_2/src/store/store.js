import { writable, derived } from 'svelte/store';

export const apiData = writable();
export let storeConvertFrom = writable()
export let storeConvertTo = writable()
let rate = {}

export const currencyList = derived(apiData, ($currencyList) => {
	if($currencyList) {
		return Object.keys($currencyList.conversion_rates)
	}

	return []
});

export const getRate = derived(apiData, ($currencyList) => {
	if($currencyList) {
		let from 
		let to
		storeConvertFrom.subscribe((value) => from = value)
		storeConvertTo.subscribe((value) => to = value)
		rate = {from: $currencyList.conversion_rates[from], to: $currencyList.conversion_rates[to]};
		return rate
	}
});