const express = require('express');
const mongoDB = require('mongodb');

const router = express.Router();

// GET jobs
router.get('/', async (req, res) => {
  const jobs = await loadJobsCollection();
  res.send(await jobs.find({}).toArray());
});
// Add jobs
router.post('/', async (req, res) => {
  const jobs = await loadJobsCollection();
  await jobs.insertOne({
    company: req.body.company,
    interviews: req.body.interviews,
    interviewTime: req.body.interviewTime,
    archived: req.body.archived,
    createdAt: new Date()
  });
  res.status(201).send();
})

// Delete jobs
router.delete('/:id', async (req, res) => {
  const jobs = await loadJobsCollection();
  await jobs.deleteOne({ _id: new mongoDB.ObjectID(req.params.id) });
  res.status(200).send();
})

async function loadJobsCollection() {
  const client = await mongoDB.MongoClient.connect('mongodb+srv://admin:LdbZShsRpWqSx3M@cluster0.lvef4.mongodb.net/VueJobTracker?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('VueJobTracker').collection('jobs')
}

module.exports = router;