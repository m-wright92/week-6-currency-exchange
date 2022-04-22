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

inputBox.onkeyup = (e)=>{
  // let link = document.getElementsByClassName("autocom-box");
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].addEventListener("click", select(this));
            // link.addEventListener('click')
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
  /* eslint-disable no-unused-vars */
  function select(element){
    let selectData = element.textContent;
    // inputBox.value = selectData;
    selectData = inputBox.value;
    icon.onclick = ()=>{
      webLink = `https://www.google.com/search?q=${selectData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
    searchWrapper.classList.remove("active");
  }
  /* eslint-enable no-unused-vars */

  function showSuggestions(list){
    let listData;
    let userValue;
    if(!list.length){
      userValue = inputBox.value;
      listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
  }

});

