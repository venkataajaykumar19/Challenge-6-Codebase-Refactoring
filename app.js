/**
 * Main Express Server Entry Point — Dev Confessions API
 */

require('dotenv').config()
const express = require('express')
const confessionRoutes = require('./routes/confession.routes')

const app = express()

// Middleware for parsing JSON body payloads
app.use(express.json())

// Mount API routes under /api/v1 prefix
app.use('/api/v1', confessionRoutes)

// Load port from environment variable or fallback to default 3000
const serverPort = process.env.PORT || 3000

if (require.main === module) {
  app.listen(serverPort, function() {
    const serverStartupMessage = `running on ${serverPort}`
    console.log(serverStartupMessage)
  })
}

module.exports = app
