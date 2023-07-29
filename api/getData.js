const express = require('express');
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation',
  params: {cityName: 'Berlin', countryName: 'Germany'},
  headers: {
    'X-RapidAPI-Key': 'e18025913emsh39e61c09fae74d9p17f33ajsnedc7d20ade41',
    'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});