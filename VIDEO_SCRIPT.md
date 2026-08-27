# 2–3 Minute Video Presentation Script — Dev Confessions Refactoring

Use this exact script to record your 2–3 minute video presentation.

---

## 🎬 Video Overview & Timestamp Guide

| Timestamp | Section | Key Visual Focus |
|---|---|---|
| 0:00 - 0:25 | Introduction & Overview | Show `https://github.com/venkataajaykumar19/Challenge-6-Codebase-Refactoring/pull/1` |
| 0:25 - 1:05 | Decision 1: Variable Renaming | Show `d`, `r`, `arr`, `res2` in original vs `requestBody`, `sortedConfessions` in `services/confession.service.js` |
| 1:05 - 1:55 | Decision 2: Function Splitting | Show monolithic `handleAll()` vs `validateConfessionPayload()`, `saveConfession()`, `removeConfessionById()` |
| 1:55 - 2:40 | Decision 3: MVC Structure | Show project tree with `routes/`, `controllers/`, `services/` layers |
| 2:40 - 3:00 | Endpoint Verification & Conclusion | Show endpoint test results passing & live deployment URL |

---

## 📜 Full Script Readout

### Section 1: Introduction (0:00 - 0:25)
> "Hi! In this video, I'm presenting the codebase refactor for Challenge #6: Dev Confessions. Dev Confessions is a Node.js and Express API designed for developers to post and filter anonymous confessions. The starter codebase was contained entirely inside a single monolithic file with complex branching, uninformative variable names, hardcoded configuration, and zero separation of concerns. Today, I'll walk you through three major refactoring decisions made to transform this into a production-grade, maintainable MVC architecture."

### Section 2: Decision 1 — Variable Renaming (0:25 - 1:05)
> "Our first major decision was Variable Renaming. In the original `app.js`, variables were single-letter or cryptic: `d` represented `req.body`, `r` represented `req.params`, `arr` represented sorted confessions, and `res2` represented spliced array elements.
>
> **Before:** `var d = req.body`, `let arr = confessions.sort(...)`
> **After:** `const requestBody = req.body`, `const sortedConfessions = confessionsList.sort(...)`
> **Why:** Renaming variables to descriptive domain names immediately clarifies what data each variable holds, eliminating confusion for developers maintaining the application."

### Section 3: Decision 2 — Function Splitting (1:05 - 1:55)
> "Our second major decision was Function Splitting. Originally, a single monolithic function called `handleAll()` processed all five API endpoints. It validated inputs, queried and mutated data, checked header secrets, sorted arrays, and rendered responses all inside one 90-line `if-else` block.
>
> **Before:** `handleAll(req, res, t)` handling creation, retrieval, filtering, and deletion together.
> **After:** Decomposed into single-responsibility functions in `services/confession.service.js`: `validateConfessionPayload()`, `saveConfession()`, `fetchAllConfessions()`, `fetchConfessionById()`, `fetchConfessionsByCategory()`, and `removeConfessionById()`.
> **Why:** Splitting functions guarantees that each function has exactly one reason to change, making individual operations modular and unit-testable."

### Section 4: Decision 3 — MVC Architectural Structure (1:55 - 2:40)
> "Our third major decision was reorganizing the codebase into a clean MVC structure.
>
> **Before:** All code lived in `app.js`.
> **After:** We structured the project into three distinct layers:
> 1. `routes/confession.routes.js` — maps HTTP paths and verbs, delegating immediately without business logic.
> 2. `controllers/confession.controller.js` — handles HTTP request parsing and response rendering without database logic.
> 3. `services/confession.service.js` — encapsulates business rules, data storage, and domain logic.
>
> Furthermore, hardcoded port numbers and secrets were extracted into `.env` loaded via `dotenv`, supported by `.env.example`."

### Section 5: Verification & Conclusion (2:40 - 3:00)
> "To verify our changes, we ran automated end-to-end API tests across all 5 endpoints—confirming 100% backward compatibility for all success and error responses. The refactored application is live and publicly accessible on Hugging Face Spaces, and our open Pull Request is live on GitHub at `venkataajaykumar19/Challenge-6-Codebase-Refactoring/pull/1`. Thank you!"
