# Refactoring Documentation — CHANGES.md

This document tracks all variable renames, function splits, and structural decisions executed during the refactoring of the Dev Confessions API.

---

## Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| `d` | `requestBody` / `confessionData` | `d` gave no information about what the variable contained |
| `r` | `requestParams` | `r` offered no indication of URL parameters |
| `t` | `actionType` | `t` was a cryptic single-letter parameter name for the endpoint operation type |
| `x` | `currentConfessionId` | `x` was a vague global variable name for the autoincrement ID counter |
| `tmp` | `newConfession` | `tmp` sounded like temporary scratch data instead of a persistent confession entity |
| `arr` | `sortedConfessions` | `arr` was generic; `sortedConfessions` describes the collection and its sorted order |
| `i` | `parsedConfessionId` | `i` hid the fact that it represented a parsed integer ID |
| `fn` | `item` / `confessionItem` | `fn` misleadingly sounded like a function rather than an iterated confession item |
| `cat` | `categoryName` | `cat` was an ambiguous abbreviation for category |
| `cats` / `categories` | `ALLOWED_CATEGORIES` / `allowedCategories` | Describes the domain rule constraint for permitted category values |
| `stuff` | `filteredConfessions` | `stuff` gave zero domain context about filtered confession items |
| `res2` | `deletedConfessions` | `res2` was confusingly named like an Express response object instead of spliced items |
| `handler` | `targetConfessionIndex` | `handler` incorrectly implied an event handler instead of an array index |
| `startStr` | `serverStartupMessage` | `startStr` was overly generic |

---

## Function Splits

### `handleAll()` split into:

- **`validateCategory(categoryName)`**
  - *Purpose:* Validates whether a given category string is part of the permitted category list (`"bug"`, `"deadline"`, `"imposter"`, `"vibe-code"`).
- **`validateConfessionPayload(confessionData)`**
  - *Purpose:* Validates required fields, presence of text, text length rules (< 500 characters and > 0 characters), and category validity before persisting data.
- **`saveConfession(confessionData)`**
  - *Purpose:* Performs the storage operation by generating an autoincrement ID, timestamping, and pushing the new confession object to the data store.
- **`fetchAllConfessions()`**
  - *Purpose:* Retrieves and sorts the collection of confessions by creation timestamp in descending order.
- **`fetchConfessionById(confessionId)`**
  - *Purpose:* Looks up a confession by its integer ID and formats the response object.
- **`fetchConfessionsByCategory(categoryName)`**
  - *Purpose:* Filters confessions by category and reverses array order to maintain original API contracts.
- **`verifyDeleteToken(deleteToken)`**
  - *Purpose:* Verifies administrative delete request authorization tokens against the `DELETE_SECRET` environment variable.
- **`removeConfessionById(confessionId, deleteToken)`**
  - *Purpose:* Performs administrative deletion of a confession from the in-memory store.
- **Controller handlers (`createConfession`, `getAllConfessions`, `getConfessionById`, `getConfessionsByCategory`, `deleteConfession`)**
  - *Purpose:* Extracted HTTP request parsing and response rendering out of business logic into dedicated controller functions in `controllers/confession.controller.js`.

*Why:* The original `handleAll()` function in `app.js` was a monolithic dispatcher that mixed input validation, authorization, data query/mutation, sorting, error handling, and response rendering across all endpoints. Splitting them into distinct single-responsibility functions in dedicated Service and Controller modules makes each component independently testable, readable, and maintainable without changing API contracts.
