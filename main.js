document.addEventListener('DOMContentLoaded', () => {


    const btn = document.getElementsByClassName("check-btn")[0];
    const textValue = document.getElementsByClassName("textbox")[0];
    const dateValue = document.getElementsByClassName("datebox")[0];
    // console.log(textValue);
    // console.log("test: ", textValue.value);

    let stockData;

    btn.addEventListener('click', () => {   
        console.log("button clicked")

        if (textValue.value !== undefined && dateValue.value !== undefined) {
          fetch(`https://api.polygon.io/v1/open-close/${textValue.value.toUpperCase()}/${dateValue.value}?adjusted=true&apiKey=ojGBIJjRcLNpZpelmtn6_V2P3Vgw2wjp`)
            .then((data) => data.json())
            .then((data) => {
              // With the data, invoke our doTheWork function, which is defined outside of fetch.
              stockData = data
              sortData(stockData)
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
      console.log(years);

      for (let i = 2020; i >= 1980; i--) {
        const choice = document.createElement('option');
        choice.setAttribute('value', i);
        choice.innerHTML = i;
        years.appendChild(choice);
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