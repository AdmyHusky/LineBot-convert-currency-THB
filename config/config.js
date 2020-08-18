const express = require('express');

let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+process.env.LINE_TOKEN
}
let ApiPixer = 'http://data.fixer.io/api/latest?access_key='+process.env.FIXER
module.exports = {headers, ApiPixer};