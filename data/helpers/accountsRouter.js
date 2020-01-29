const express = require('express');

const router = express.Router();

const accountsModel = require('./accountsModel.js');

const apiBase = '/api/actions';

router.post('/', (req, res) => {});

router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;