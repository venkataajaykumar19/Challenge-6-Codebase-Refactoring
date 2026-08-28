# Dev Confessions API — Refactored Architecture

An anonymous confession API for developers to share bugs, deadline stress, imposter syndrome, and vibe-coding sessions. Refactored into a clean MVC architecture following solid software engineering principles.

## Live Deployment
https://dev-confessions-api-r5xz.onrender.com

---

## Refactoring Overview

The Dev Confessions API was transformed from a single monolithic file (`app.js`) with complex `if-else` branching and meaningless variable names into a clean, modular Model-View-Controller (MVC) application.

### Key Refactoring Highlights
1. **MVC Folder Structure**:
   - `routes/confession.routes.js`: Express router handling path mapping and delegation without business logic.
   - `controllers/confession.controller.js`: Extracts request parameters/payloads and sends HTTP responses.
   - `services/confession.service.js`: Encapsulates in-memory storage, domain rules, sorting, and data validation.
2. **Variable Renaming**: Renamed all cryptic variable names (`d`, `r`, `t`, `x`, `arr`, `res2`, `stuff`, `handler`, `startStr`) to descriptive, domain-aligned identifiers.
3. **Single Responsibility Function Splitting**: Decomposed `handleAll()` into discrete single-purpose validation, persistence, querying, and deletion functions.
4. **Environment Variables**: Moved hardcoded configuration (port `3000` and delete authorization secret `'supersecret123'`) to `.env` loaded via `dotenv`, supported by `.env.example`.
5. **Inline Documentation**: Added meaningful inline comments explaining domain logic rationales (e.g. sorting order and authorization checks).

---

## API Endpoints

- `POST /api/v1/confessions` — Submit a new developer confession
- `GET /api/v1/confessions` — Retrieve all confessions (sorted newest first)
- `GET /api/v1/confessions/:id` — Retrieve a single confession by numerical ID
- `GET /api/v1/confessions/category/:cat` — Filter confessions by category (`bug`, `deadline`, `imposter`, `vibe-code`)
- `DELETE /api/v1/confessions/:id` — Delete a confession by ID (requires `x-delete-token` secret header)

---

## Refactoring Documentation

- `AUDIT.md` — pre-refactor audit ([`AUDIT.md`](AUDIT.md))
- `CHANGES.md` — refactoring decisions ([`CHANGES.md`](CHANGES.md))

---

## Environment Configuration

Copy `.env.example` to create your local `.env` configuration file:

```bash
cp .env.example .env
```

Default variables:
```env
PORT=3000
DELETE_SECRET=supersecret123
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start server
npm start
```
