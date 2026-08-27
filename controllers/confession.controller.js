/**
 * Confession Controller
 * Handles HTTP request extraction and response formatting, delegating business logic to service layer.
 */

const confessionService = require('../services/confession.service')

/**
 * Handles creation of a new confession.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function createConfession(req, res) {
  const requestBody = req.body
  const validationResult = confessionService.validateConfessionPayload(requestBody)

  if (!validationResult.valid) {
    if (validationResult.json) {
      return res.status(validationResult.status).json(validationResult.json)
    } else {
      return res.status(validationResult.status).send(validationResult.text)
    }
  }

  const createdConfession = confessionService.saveConfession(requestBody)
  return res.status(201).json(createdConfession)
}

/**
 * Handles fetching all confessions.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getAllConfessions(req, res) {
  const result = confessionService.fetchAllConfessions()
  return res.json(result)
}

/**
 * Handles fetching a single confession by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getConfessionById(req, res) {
  const requestParams = req.params
  const result = confessionService.fetchConfessionById(requestParams.id)

  if (result.json) {
    return res.status(result.status).json(result.json)
  } else {
    return res.status(result.status).send(result.text)
  }
}

/**
 * Handles fetching confessions filtered by category.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getConfessionsByCategory(req, res) {
  const requestParams = req.params
  if (!requestParams.cat) {
    return
  }

  const result = confessionService.fetchConfessionsByCategory(requestParams.cat)
  if (result.json) {
    return res.status(result.status).json(result.json)
  } else {
    return res.status(result.status).send(result.text)
  }
}

/**
 * Handles deleting a confession by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function deleteConfession(req, res) {
  const requestParams = req.params
  const deleteTokenHeader = req.headers['x-delete-token']

  const result = confessionService.removeConfessionById(requestParams.id, deleteTokenHeader)
  if (result.json) {
    return res.status(result.status).json(result.json)
  } else {
    return res.status(result.status).send(result.text)
  }
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
}
