import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange.js';
import {suggestions} from './js/suggestions.js';

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = (e)=>{
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if(userData){
      icon.onclick = ()=>{
          webLink = `https://www.google.com/search?q=${userData}`;
          linkTag.setAttribute("href", webLink);
          linkTag.click();
      }
      emptyArray = suggestions.filter((data)=>{
          return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data)=>{
          return data = `<li>${data}</li>`;
      });
      searchWrapper.classList.add("active"); 
      showSuggestions(emptyArray);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
          allList[i].setAttribute(onclick, select(this));
      }
  }else{
      searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}

function select(element){
  let selectData = element.textContent;
  console.log(selectData);
  inputBox.value = selectData;
  icon.onclick = ()=>{
      webLink = `https://www.google.com/search?q=${selectData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
  }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list){
  let listData;
  if(!list.length){
      let userValue = inputBox.value;
      listData = `<li>${userValue}</li>`;
  }else{
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
}


$(document).ready(function() {
  let body;
  console.log(suggestions);

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

