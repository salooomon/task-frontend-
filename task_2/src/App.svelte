<script>
  import { onMount } from "svelte";
  import { apiData, currencyList, getRate, storeConvertFrom, storeConvertTo} from "./store/store";

  export let convertFrom = 'RUB';
	export let convertTo = 'USD';

  let amountFrom = 0
  let amountTo = 0

  onMount(async () => {
    fetch("https://v6.exchangerate-api.com/v6/8dd5e5de80c5962a9c84758c/latest/RUB")
      .then(response => response.json())
      .then(data => {
      apiData.set(data);
    }).catch(error => {
      console.log(error);
      return [];
    });
    storeConvertFrom.set(convertFrom)
    storeConvertTo.set(convertTo)
  });

  const currencySelect = (event) => {
    if (event.target.name === 'selectFrom') {
      convertFrom = event.target.value
      storeConvertFrom.set(convertFrom)
    } else {
      convertTo = event.target.value
      storeConvertTo.set(convertTo)
    } 
    fetch(`https://v6.exchangerate-api.com/v6/8dd5e5de80c5962a9c84758c/latest/${event.target.value}`)
      .then(response => response.json())
      .then(data => {
      apiData.set(data);
    }).catch(error => {
      console.log(error);
      return [];
    });
    amountFrom = false
    amountTo = false
    console.log(event.target.name)
  }

  const amountConvert = (event) => {
    if(event.target.name === 'currencyAmountFrom') {
      let amount = event.target.value * $getRate?.to / $getRate?.from;
      amountTo = amount.toFixed(2);
    } else {
      let amount = event.target.value * $getRate?.to / $getRate?.from;
      amountFrom = amount.toFixed(2)
    }
  }

</script>  

<div>

  <div>

      <h1>
          Currency Converter
      </h1> <br />

      <div>
        <span>Convert From:</span>

        <select name='selectFrom' bind:value={convertFrom} on:change={currencySelect}>
            {#each $currencyList as cl }
                <option value="{cl}">
                  {cl}
                </option>
            {/each}
        </select>

        <input type="number" name="currencyAmountFrom" placeholder="Enter Amount" value={!amountFrom ? $getRate?.from : amountFrom} on:input={amountConvert}/>
      </div>

      <div>
        <span>Convert To:</span>

        <select name='selectTo' bind:value={convertTo} on:change={currencySelect}>
            {#each $currencyList as cl }
                <option value="{cl}">
                    {cl}
                </option>
            {/each}
        </select>

        <input type="number" name="currencyAmountTo" placeholder="Enter Amount" value={!amountTo ? $getRate?.to : amountTo} on:input={amountConvert}/>
      </div>

  </div>

</div>
