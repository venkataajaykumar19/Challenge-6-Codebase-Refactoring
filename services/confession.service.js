/**
 * Confession Service
 * Contains business logic and in-memory data store for developer confessions.
 */

// In-memory array storing all developer confessions
const confessionsList = []

// Global autoincrement ID counter for new confessions
let currentConfessionId = 0

// Allowed confession categories across the platform
const ALLOWED_CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"]

/**
 * Validates whether a category name belongs to allowed categories list.
 * @param {string} categoryName
 * @returns {boolean}
 */
function validateCategory(categoryName) {
  return ALLOWED_CATEGORIES.includes(categoryName)
}

/**
 * Validates incoming confession payload before persistence.
 * @param {Object} confessionData
 * @returns {Object} Validation result with error status and details
 */
function validateConfessionPayload(confessionData) {
  if (!confessionData) {
    return { valid: false, status: 400, json: { msg: 'bad' } }
  }
  if (!confessionData.text) {
    return { valid: false, status: 400, json: { msg: 'need text' } }
  }
  if (confessionData.text.length >= 500) {
    return { valid: false, status: 400, json: { error: "text too big, must be less than 500 characters long buddy" } }
  }
  if (confessionData.text.length === 0) {
    return { valid: false, status: 400, text: "too short" }
  }
  if (!validateCategory(confessionData.category)) {
    return { valid: false, status: 400, text: "category not in stuff" }
  }
  return { valid: true }
}

/**
 * Creates and stores a new confession.
 * @param {Object} confessionData
 * @returns {Object} Newly created confession object
 */
function saveConfession(confessionData) {
  const newConfession = {
    id: ++currentConfessionId,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  }
  confessionsList.push(newConfession)
  console.log("added one info " + newConfession.id)
  return newConfession
}

/**
 * Retrieves all confessions sorted by creation date descending.
 * @returns {Object} Container object with array of confessions and total count
 */
function fetchAllConfessions() {
  // Sort in-place by timestamp descending so recent confessions appear first
  const sortedConfessions = confessionsList.sort((a, b) => b.created_at - a.created_at)
  console.log("fetching all data result")
  return {
    data: sortedConfessions,
    count: sortedConfessions.length
  }
}

/**
 * Fetches a single confession by its numerical ID.
 * @param {string|number} confessionId
 * @returns {Object} Result object with HTTP status and response payload
 */
function fetchConfessionById(confessionId) {
  const parsedConfessionId = parseInt(confessionId)
  const confessionItem = confessionsList.find(item => item.id === parsedConfessionId)

  if (!confessionItem) {
    return { status: 404, json: { msg: 'not found' } }
  }
  if (!confessionItem.text) {
    return { status: 500, text: "broken" }
  }

  console.log("found info with " + confessionItem.text.length + " chars")
  return { status: 200, json: confessionItem }
}

/**
 * Filters confessions by category.
 * @param {string} categoryName
 * @returns {Object} Result object with HTTP status and response payload
 */
function fetchConfessionsByCategory(categoryName) {
  if (!validateCategory(categoryName)) {
    return { status: 400, json: { msg: 'invalid category' } }
  }

  // Filter matching category and reverse array order to match original behavior
  const filteredConfessions = confessionsList.filter(function(item) {
    return item.category === categoryName
  }).reverse()

  return { status: 200, json: filteredConfessions }
}

/**
 * Verifies if the administrative delete secret header matches environment variable.
 * @param {string} deleteToken
 * @returns {boolean}
 */
function verifyDeleteToken(deleteToken) {
  const expectedSecret = process.env.DELETE_SECRET || 'supersecret123'
  return deleteToken === expectedSecret
}

/**
 * Deletes a confession by its numerical ID after authorization.
 * @param {string|number} confessionId
 * @param {string} deleteToken
 * @returns {Object} Result object with HTTP status and response payload
 */
function removeConfessionById(confessionId, deleteToken) {
  // Enforce delete token secret header verification
  if (!verifyDeleteToken(deleteToken)) {
    return { status: 403, json: { msg: 'no permission' } }
  }

  if (!confessionId) {
    return { status: 400, text: "no id" }
  }

  const parsedConfessionId = parseInt(confessionId)
  const targetConfessionIndex = confessionsList.findIndex(item => item.id === parsedConfessionId)

  if (targetConfessionIndex !== -1) {
    const deletedConfessions = confessionsList.splice(targetConfessionIndex, 1)
    console.log("deleted something")
    return { status: 200, json: { msg: "ok", item: deletedConfessions[0] } }
  } else {
    return { status: 404, json: { msg: "not found buddy" } }
  }
}

module.exports = {
  validateCategory,
  validateConfessionPayload,
  saveConfession,
  fetchAllConfessions,
  fetchConfessionById,
  fetchConfessionsByCategory,
  removeConfessionById
}
