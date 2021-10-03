const { Router } = require('express')
const { getAllTests, getFirstTest, getTestByID, insertTestOrUpdate, deleteTestByID } = require('../models/test')

const router = Router()

router.get('/', async (req, res) => {
  const data = await getAllTests(req.query)
  res.json({ data })
})

router.get('/one', async (req, res) => {
  const data = await getFirstTest()
  res.json({ data })
})

router.get('/id', async (req, res) => {
  const data = await getTestByID(req.query.id)
  res.json({ data })
})

router.post('/add', async (req, res) => {
  const data = await insertTestOrUpdate(req.body)
  res.json({ data })
})

router.put('/update', async (req, res) => {
  const data = await insertTestOrUpdate(req.body)
  res.json({ data })
})

router.delete('/delete', async (req, res) => {
  const data = await deleteTestByID(req.query.id)
  res.json({ data })
})

module.exports = app => app.use('/test', router)
