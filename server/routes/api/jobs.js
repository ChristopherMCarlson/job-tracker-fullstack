const express = require('express');
const mongoDB = require('mongodb');

const router = express.Router();

// GET jobs
router.get('/:userId', async (req, res) => {
  const jobs = await loadJobsCollection();
  res.send(await jobs.find({
    userId: req.params.userId,
  }).toArray());
});
// Add jobs
router.post('/', async (req, res) => {
  const jobs = await loadJobsCollection();
  await jobs.insertOne({
    company: req.body.job.company,
    position: req.body.job.position,
    appliedOn: req.body.job.appliedOn,
    interviews: req.body.job.interviews,
    interviewTime: req.body.job.interviewTime,
    archived: req.body.job.archived,
    userId: req.body.job.userId,
    createdAt: new Date()
  });
  res.status(201).send();
})

router.put('/', async (req, res) => {
  const jobs = await loadJobsCollection();
  console.log(req.body)
  await jobs.updateOne(
    {
      _id: new mongoDB.ObjectID(req.body.job._id)
    },
    {
      $set: {
        company: req.body.job.company,
        interviews: req.body.job.interviews,
        interviewTime: req.body.job.interviewTime,
        archived: req.body.job.archived,
        userId: req.body.job.userId,
      }
    }
  );
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