'use strict';

const express = require('express');

const { food } = require('../models/index');

const foodRouter = express.Router();


// RESTful Route Delectation 
foodRouter.get('/food', getfood); // get all the people form the DB
foodRouter.get('/food/:id', getonefood); // gets a person by ID
foodRouter.post('/food', createfood); // creating a new person
foodRouter.put('/food/:id', updatefood); // updating a person by their ID
foodRouter.delete('/food/:id', deletefood); // deleting a person by their ID


async function getfood(req, res) {

  const allfood = await food.findAll();
  res.status(200).json(allfood);

}

async function getonefood(req, res) {
  const id = parseInt(req.params.id); // we parse the ID in case it was a string
  const onefood = await food.findOne({
    where: {
      id: id
    }
  });
  res.status(200).json(onefood);
}

async function createfood(req, res) {
  const obj = req.body;
  let onefood = await food.create(obj);
  res.status(201).json(onefood);

}

async function updatefood(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundfood = await food.findOne({ where: { id: id } });
  const updatedfood = await foundfood.update(obj);
  res.status(201).json(updatedfood);
}

async function deletefood(req, res) {
  const id = parseInt(req.params.id);
  const deleteone = await food.destroy({ where: { id } });
  res.status(204).json(deleteone);
}


module.exports = foodRouter;