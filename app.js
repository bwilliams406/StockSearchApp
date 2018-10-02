$(document).ready(function () {
  const validationList = []
  const stocks = []
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
  $('#btnSubmit').on('click', function () {
    event.preventDefault();
    let newStock = $('#stockInfo').val().toUpperCase();
    if (!validationList.includes(newStock)) {
      alert("Please input a valid stock symbol.");
    } else {
      stocks.push(newStock);
      $('#stockInfo').empty();
      render();
    };
  });
  $('#btnClear').on('click', function () {
    $('#tBody').empty();
  });
  $("#stocks-view").on("click", "input", function () {
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
        const Q3 = $('#newsDiv').append(`<h5>${response[i].headline}</h5><br><p>${response[i].datetime}</p><br><p>${response[i].summary}</p>`)
      }
      }) 
     
    });
    $('#tBody').empty();
    $('#logoDiv').empty();
  });6
  const render = function () {
    $('#stocks-view').empty();
    for (let i = 0; i < stocks.length; i++) {
      let theId = 'getStocks' + i;
      $('#stocks-view').append(`<input class="btn btn-outline-secondary" id='${theId}' type='button' value='${stocks[i]}'/>&nbsp`);
    };
  };
});










































// // displaystockInfo function re-renders the HTML to display the appropriate content
// const displaystockInfo = function () {

//   const stock = $(this).attr('data-name');
//   const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`;

//   // Creates AJAX call for the specific stock button being clicked
//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function(response) {
//   });
// }



// // Function for displaying stock data
// const render = function () {
//   $('#buttons-view').empty();
//   for (let i = 0; i < stocks.length; i++) {
//     let newButton = $('<button>');
//       newButton.addClass('stock');
//       newButton.attr('data-name', stocks[i]);
//       newButton.text(stocks[i]);

//     $('#buttons-view').append(newButton);
//   }
// }



// const addButton = function(event) {

//   event.preventDefault();
//   const stock = $('#stock-input').val().trim(); 
//   stocks.push(stock);

//   $('#stock-input').val('');

//   render();
// }

// $('#add-stock').on('click', addButton);

// $('#buttons-view').on('click', '.stock', displaystockInfo);

// render();
