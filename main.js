document.addEventListener('DOMContentLoaded', () => {


    const btn = document.getElementsByClassName("check-btn")[0];
    const textValue = document.getElementsByClassName("textbox")[0];
    // const dateValue = document.getElementsByClassName("datebox")[0];
    // console.log(textValue);
    // console.log("test: ", textValue.value);

    const yearValue = document.getElementById('year');
    const monthValue = document.getElementById('month');
    const dayValue = document.getElementById('day');


    let stockData;

    btn.addEventListener('click', () => {   
        console.log("button clicked")
        console.log(yearValue.value);
        console.log(monthValue.value);
        console.log(dayValue.value);

      // alert('hi');

        if (textValue.value !== undefined || yearValue.value !== undefined || monthValue.value !== undefined || dayValue.value !== undefined) {
          fetch(`https://api.polygon.io/v1/open-close/${textValue.value.toUpperCase()}/${yearValue.value}-${monthValue.value}-${dayValue.value}?adjusted=true&apiKey=ojGBIJjRcLNpZpelmtn6_V2P3Vgw2wjp`)
            .then((data) => data.json())
            .then((data) => {
              console.log(data);
              // With the data, invoke our doTheWork function, which is defined outside of fetch.
              if (data.status === 'NOT_FOUND') {
                alert('Data Not Available')
              } if (data.error === `You've exceeded the maximum requests per minute, please wait or upgrade your subscription to continue. https://polygon.io/pricing`) {
                alert('Maximum searches in 1 minute reached, please pay more money to upgrade. ')
              } else {
                stockData = data
              sortData(stockData)
              }

            })
            .catch((err) => {
              console.log('testError: ', err);
            });
        }
      });

      function sortData(stockData) {
      // console.log(stockData.high)
      let statSelectors = document.querySelectorAll(".stats")
      
      let stockName = stockData.symbol;
      // console.log('stockData: ', stockData)
      let stockOpen = stockData.open;
      let stockClose = stockData.close;
      let stockHigh = stockData.high;
      let stockLow = stockData.low;
      let stockVolume = stockData.volume;

      statSelectors[0].innerHTML = stockName;
      statSelectors[1].innerHTML = stockOpen;
      statSelectors[2].innerHTML = stockClose;
      statSelectors[3].innerHTML = stockHigh;
      statSelectors[4].innerHTML = stockLow;
      statSelectors[5].innerHTML = stockVolume;
      }

      const years = document.getElementById('year');
      for (let i = 2022; i >= 1980; i--) {
        const choice = document.createElement('option');
        choice.setAttribute('value', i);
        choice.innerHTML = i;
        years.appendChild(choice);
      }

      const months = document.getElementById('month');
      for (let i = 1; i <= 12; i++) {
        const choice = document.createElement('option');
        if (i < 10) choice.setAttribute('value', `0${i}`);
        if (i >= 10) choice.setAttribute('value', i);
        choice.innerHTML = i;
        months.appendChild(choice);
      }

      const days = document.getElementById('day');
      for (let i = 1; i <= 31; i++) {
        const choice = document.createElement('option');
        if (i < 10) choice.setAttribute('value', `0${i}`);
        if (i >= 10) choice.setAttribute('value', i);
        choice.innerHTML = i;
        days.appendChild(choice);
      }
  });






  // {
  //   "afterHours": 322.1,
  //   "close": 325.12,
  //   "from": "2020-10-14T00:00:00.000Z",
  //   "high": 326.2,
  //   "low": 322.3,
  //   "open": 324.66,
  //   "preMarket": 324.5,
  //   "status": "OK",
  //   "symbol": "AAPL",
  //   "volume": 26122646
  //  }