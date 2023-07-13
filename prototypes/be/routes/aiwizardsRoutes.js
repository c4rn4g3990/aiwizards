"use strict";
const express = require('express');
const { convertPipeline, pipelineByTags, reviewPipeline } = require('../controllers/chatopenaiController');
const router = express.Router();
router.post('/convertPipeline', convertPipeline);
router.post('/pipelineByTags', pipelineByTags);
router.post('/reviewPipeline', reviewPipeline);
module.exports = router;
