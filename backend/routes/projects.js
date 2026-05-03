const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

router.get('/', async (req, res) => {
  const { skill } = req.query;
  const query = skill ? { 'userId.skills': skill } : {};
  const projects = await Project.find(query).populate('userId', 'name skills');
  res.json(projects);
});

router.get('/my', auth, async (req, res) => {
  const projects = await Project.find({ userId: req.user.userId });
  res.json(projects);
});

router.post('/', auth, async (req, res) => {
  const project = new Project({ ...req.body, userId: req.user.userId });
  await project.save();
  res.json(project);
});

router.put('/:id', auth, async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  res.json(project);
});

router.delete('/:id', auth, async (req, res) => {
  await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  res.json({ msg: 'Deleted' });
});

module.exports = router;