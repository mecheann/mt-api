//const express = require('express');
import e from 'express';
import express from 'express';

const router = express.Router(); 
router.get('/mymovies', (req, res) => {
  res.json({ movies: ['Movie 1', 'Movie 2', 'Movie 3'] });
}       );

export default router;