const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Card = require('../models/Card.js');

//API call for list all cards sort by createDate
router.get('/list', async (req, res, next) => {
    const { page = 1, limit = 10} = req.query;
    try {
        const contents = await Card.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({createdDate: 1})
          .select({"email": 0, "comments": 0, "__v": 0})
          .exec();

        const count = await Card.count();
    
        res.json({
          contents,
          totalElements: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page)
        });
      } catch (err) {
        return next(err);
      }
})

//API call for view Card Detail
router.get('/:id', (req, res, next) => {
  Card.findById(req.params.id, (err, data) => {
        if (err) return next(err);
        if(data == null) {
          return res.status(500).send({message: "ID: " + req.params.id  + " not found."})
        }
        return res.json(data);
    }).select({"__v": 0})
})

//API call for create data to test
router.post('/insert', (req, res, next) => {
  Card.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    })
})

//API call for add new comment in card detail
router.put('/update/comment/:id', (req, res, next) => {
  Card.findByIdAndUpdate(
  {_id: req.params.id},
  {
    $push: {
      "comments": { 
        "$each": [req.body], 
        "$position": 0 
      }
    }
  }, (err, data) => {
        if (err) return next(err);
        if (data == null) return res.status(500).send({message: "Card ID: " + req.params.id  + " not found."})
        if (req.body.name == null || req.body.context == null) return res.status(500).send({message: "Required name and context in request"})
        return res.json(data);
    })
})

//API call for update status of card
router.put('/update/status/:id', (req, res, next) => {
  Card.findByIdAndUpdate(
  {_id: req.params.id},
  {
    $set: {
      status: req.body.status
    }
  }, (err, data) => {
    if (err) return next(err);
    if (data == null) return res.status(500).send({message: "Card ID: " + req.params.id  + " not found."})
    if (req.body.status == null) return res.status(500).send({message: "Required status in request"})
    return res.json(data);
  })
})

//API call for store card and update flag to hide from card list
router.delete('/delete/:id', (req, res, next) => {
  Card.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) return next(err);
        if(data == null) {
          return res.status(500).send({message: "ID: " + req.params.id  + " not found."})
        }
        return res.json(data);
    })
})

module.exports = router;