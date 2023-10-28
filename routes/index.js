const express = require('express')
const router = express.Router()
const cassandraRoutes = require('./cassandra-routes')

router.use(express.json())

router.use('/api/cassandra', cassandraRoutes)

module.exports = router