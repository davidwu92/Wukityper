const { model, Schema } = require('mongoose')

const Score = require('./Score.js')(model, Schema)

module.exports = {Score}