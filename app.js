 const validationList = []
  const stocks = ["Choose a Stock"]
  const queryAllSymbols = `https://api.iextrading.com/1.0/ref-data/symbols`;
  $.ajax({
    url: queryAllSymbols,
    method: 'GET'
  }).then(function (response) {
    for (let i = 0; i < response.length; i++) {
      let validList = response[i].symbol
      validationList.push(validList);
    };
  });


  $('#btnSubmit').on('click', function (event) {
    event.preventDefault();
    let newStock = $('#stockInfo').val().toUpperCase();
    if (!validationList.includes(newStock)) {
      alert("Please input a valid stock symbol.");
    } else {
      stocks.push(newStock);
      $('#stockInfo').val('');
      render();
    };
  });

  $('#btnClear').on('click', function () {
    $('#tBody').empty();
  });

  $("#stocks-view").on("change", function () {
    let stockSymbol = this.value;
    const queryURL1 = `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote`;
    const queryURL2 = `https://api.iextrading.com/1.0/stock/${stockSymbol}/logo`;
    const queryURL3 = `https://api.iextrading.com/1.0/stock/${stockSymbol}/news`;
    $.ajax({
      url: queryURL1,
      method: 'GET'
    }).then(function (response) {
      const Q1 = $('#tBody').append(`<tr><td>${response.companyName}</td><td>${response.symbol}</td><td>${response.latestPrice}</td></tr>`)
    });
    $.ajax({
      url: queryURL2,
      method: 'GET'
    }).then(function (response) {
      const Q2 = $('#logoDiv').append(`<img class="image" src="${response.url}">`)
      console.log(response.url);

    $.ajax({
       url: queryURL3,
       method: 'GET'
    }).then(function (response) {
      for (let i = 0; i < response.length; i++) {
        const Q3 = $('#newsDiv').append(`<div class='card'><h5>${response[i].headline}</h5><br><p>${response[i].datetime}</p><br><p>${response[i].summary}</p></div>`)
      }
      }) 
     
    });
    $('#tBody').empty();
    $('#logoDiv').empty();
  });

  const render = function () {
    $('#stocks-view').empty();
    for (let i = 0; i < stocks.length; i++) {
      let theId = 'getStocks' + i;
      if ("#stocks-view" == '') {
      $("#stocks-view").prepend(`<option value="" selected>Choose a Stock</option>`)
    } else {
      $('#stocks-view').append(`<option value='${stocks[i]}'>${stocks[i]}</option>`);
    };
    };                                
  };


  render();

