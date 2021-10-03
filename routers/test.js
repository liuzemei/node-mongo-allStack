const { Router } = require('express')
const { getAllTests, getFirstTest, getTestByID, insertTestOrUpdate, deleteTestByID } = require('../models/test')

const router = Router()

router.get('/', async (req, res) => {
  const data = await getAllTests()
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

router.get('/add', async (req, res) => {
  const data = await insertTestOrUpdate(req.query)
  res.json({ data })
})

router.get('/delete', async (req, res) => {
  const data = await deleteTestByID(req.query.id)
  res.json({ data })
})

module.exports = app => app.use('/test', router)
