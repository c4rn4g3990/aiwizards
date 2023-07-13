const express = require('express');
const { convertPipeline, pipelineByTags } = require('../controllers/chatopenaiController');
const router = express.Router();

router.post('/convertPipeline', convertPipeline);

router.post('/pipelineByTags', pipelineByTags);

module.exports = router;