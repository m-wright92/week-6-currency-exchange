import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange.js';

$(document).ready(function() {
  let body;

  $("#get-convert").on("click", function() {
    let userNumInput = $("#num-input").val();
    let userCurInput = $("#currency-input").val().toUpperCase();
    let promise = ExchangeService.getRates();
    promise.then(function(response) {
      body = JSON.parse(response);
      $("#convert-display").text(userNumInput * body.conversion_rates[userCurInput]);
      $("#get-convert").hide();
      $("#get-convert2").show();
    }, function(error) {
      $("#curr-error").text(`There was an error processing your request: ${error}. Please try again`);
    });
  });

  $("#get-convert2").on("click", function() {
    let userNumInput = $("#num-input").val();
    let userCurInput = $("#currency-input").val().toUpperCase();
    $("#convert-display").text(userNumInput * body.conversion_rates[userCurInput]);
  });

});

