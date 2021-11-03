const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM orderList'
  mysql.query(sql, (err, result) => {
    if(err) {
      res.status(404).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

router.post('/', (req, res) => {
  const cartData = [
    req.body.product,
    req.body.qtyBlack,
    req.body.qtyBlue,
    req.body.qtyRed,
    req.body.totalPrice
  ]
  const sql = 'INSERT INTO orderList (product, qtyBlack, qtyBlue, qtyRed, totalPrice, status) VALUES (?,?,?,?,?, 0)'
  mysql.query(sql, cartData, (err, result) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router