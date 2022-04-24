import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange.js';
import {suggestions} from './js/suggestions.js';


$(document).ready(function() {
  let body;

  for(let i = 0; i < suggestions.length; i++) {
    $("#currency-choice").append("<option>" + suggestions[i] + "</options");
  }

  $("#get-convert").on("click", function() {
    let userNumInput = $("#num-input").val();
    let userCurInput = $("#currency-choice").val().toUpperCase();
    let apiCurInput = userCurInput.substring(0, 3);
    let promise = ExchangeService.getRates();
    promise.then(function(response) {
      body = JSON.parse(response);
      if(isNaN(userNumInput * body.conversion_rates[apiCurInput])) {
        $("#curr-error").text("Unfortunately that currency does not yet exist in our database, please try another currency");
        $("#get-convert").hide();
        $("#get-convert2").show();
      } else {
        $("#convert-display").text("$" + userNumInput * body.conversion_rates[apiCurInput]);
        $("#get-convert").hide();
        $("#get-convert2").show();
      }
    }, function(error) {
      $("#curr-error").text(`There was an error processing your request: ${error}. Please try again`);
    });
  });

  $("#get-convert2").on("click", function() {
    let userNumInput = $("#num-input").val();
    let userCurInput = $("#currency-choice").val().toUpperCase();
    let curCodeInput = userCurInput.substring(0, 3);
    if(isNaN(userNumInput * body.conversion_rates[curCodeInput])) {
      $("#curr-error").text("Unfortunately that currency does not yet exist in our database, please try another currency");
    } else {
      $("#convert-display").text("$" + userNumInput * body.conversion_rates[curCodeInput]);
    }
  });

});

