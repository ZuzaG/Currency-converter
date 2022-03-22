// SHORTCUT FUNCTIONS
const qs = (s) => document.querySelector(s);
const cel = (tag) => document.createElement(tag);
// QUERY SELECTOR
let valueToConvert = qs("#valueToConvert");
let currenciesToChoose = qs("#currenciesToChoose");
let btn = qs("#btn");
let inPLN = qs("#inPLN");
// EVENT
btn.addEventListener("click", (e) => {
  e.preventDefault();
  // FETCH
  fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
    .then((response) => response.json())
    .then((data) => {
      const getCurrencyRateByName = (searchedCurrency) => {
        const rateObjectWithProperCode = data[0].rates.filter(
          (rate) => rate.code === searchedCurrency
        );
        const currencyRate = rateObjectWithProperCode[0].mid;
        return currencyRate;
      };
      const rateEUR = getCurrencyRateByName("EUR");
      const rateUSD = getCurrencyRateByName("USD");
      const rateCHF = getCurrencyRateByName("CHF");

      let input = Number(valueToConvert.value);
      let tempRate = currenciesToChoose.value;
      // VIEW
      if (tempRate === "EUR")
        inPLN.innerHTML = (input * rateEUR).toFixed(2) + " PLN";
      if (tempRate === "USD")
        inPLN.innerHTML = (input * rateUSD).toFixed(2) + " PLN";
      if (tempRate === "CHF")
        inPLN.innerHTML = (input * rateCHF).toFixed(2) + " PLN";
    })
    .catch((err) => console.log(err));
});
