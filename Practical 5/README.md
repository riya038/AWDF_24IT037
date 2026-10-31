# Practical 5: MongoDB Integration and Schema Design with Mongoose

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Program:** B.Tech (IT / CE / CSE / AIML) - CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY (CHARUSAT)  

---

## 📌 Objectives
1. Connect a MongoDB database to an Express backend server using Mongoose.
2. Replace in-memory array operations with persistent MongoDB database operations.
3. Enforce data validation and defaults at the application level via Mongoose Schema.
4. Implement custom Mongoose pre-save hooks and enum constraints.
5. Return structured JSON error responses for validation and casting errors instead of raw error objects.

---

## 🏗️ Architecture / System Diagram

```text
Express App (server.js)
       │
       ▼
 Mongoose ODM (models/Task.js)
       │ (Schema Validation: required fields, pre-save hooks, enums)
       ▼
 MongoDB Database
       └── tasks collection
           { _id, title, description, completed, priority, createdAt }
```

---

## 🛠️ Tech Stack & Prerequisites
- **Node.js**: v18+
- **Express.js**: v4.19+
- **Mongoose**: v8.5+
- **dotenv**: v16.4+
- **MongoDB**: Local MongoDB Server (`mongodb://127.0.0.1:27017/taskdb`) or MongoDB Atlas.

---

## 🚀 Setup & Execution Guide

### 1. Install Dependencies
Open terminal in `d:\Advanced Web\practical 5` and run:
```bash
npm install
```

### 2. Configure Environment Variables
Verify `.env` file exists:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
```

### 3. Start the Server
- **Production Mode:**
  ```bash
  npm start
  ```
- **Development Mode (Auto-restart on edit):**
  ```bash
  npm run dev
  ```

---

## 🧪 Postman & cURL Test Suite

### 1. Create a New Task (POST `/tasks`)
* **Request:** `POST http://localhost:5000/tasks`
* **Headers:** `Content-Type: application/json`
* **Body:**
  ```json
  {
    "title": "   Complete Practical 5 Assignment   ",
    "description": "Connect Express app to MongoDB with Mongoose",
    "priority": "high"
  }
  ```
* **Response (201 Created):** *(Notice title whitespace trimmed automatically via pre-save hook)*
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "_id": "66b61a3f89e2bc123456789a",
      "title": "Complete Practical 5 Assignment",
      "description": "Connect Express app to MongoDB with Mongoose",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-08-09T18:50:00.000Z"
    }
  }
  ```

### 2. Get All Tasks (GET `/tasks`)
* **Request:** `GET http://localhost:5000/tasks`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [ ... ]
  }
  ```

### 3. Get Task By ID (GET `/tasks/:id`)
* **Request:** `GET http://localhost:5000/tasks/66b61a3f89e2bc123456789a`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

### 4. Non-Existent ID Test (GET `/tasks/:id` 404 Response) *(Supplementary Requirement)*
* **Request:** `GET http://localhost:5000/tasks/66b61a3f89e2bc123456789f`
* **Response (404 Not Found):**
  ```json
  {
    "success": false,
    "error": "Not Found",
    "message": "Task not found with ID: 66b61a3f89e2bc123456789f"
  }
  ```

### 5. Schema Validation Failure Test (POST `/tasks`) *(Structured Error Handling)*
* **Request:** `POST http://localhost:5000/tasks`
* **Body:**
  ```json
  {
    "description": "Missing title and invalid priority",
    "priority": "urgent"
  }
  ```
* **Response (400 Bad Request):**
  ```json
  {
    "success": false,
    "error": "Validation Error",
    "details": {
      "title": "Title is required",
      "priority": "urgent is not a valid priority. Allowed values are: low, medium, high"
    }
  }
  ```

---

## ❓ Key Questions / Viva Analysis

### Q1: What is the purpose of a schema in a NoSQL database like MongoDB, given that MongoDB itself is schema-less?
**Answer:**  
While MongoDB is inherently schema-less at the database engine level (allowing documents in the same collection to have flexible structures), application software needs predictable data contracts. 
- Mongoose schemas define structured data models in application code.
- Schemas enforce consistent field types, required rules, default values, and data relationships.
- They prevent corrupt, malformed, or incomplete data from reaching the database, ensuring system reliability.

### Q2: Why is it important to define required fields and default values at the schema level rather than relying on frontend validation alone?
**Answer:**  
Frontend validation can be bypassed easily by malicious actors or API clients (e.g., using Postman, cURL, or custom scripts). 
- Schema-level enforcement acts as a single, secure source of truth on the server side.
- It guarantees business constraints regardless of which client calls the API.
- Default values (e.g., `completed: false`, `createdAt: Date.now`) guarantee data consistency across all document creations without relying on clients to supply them.

### Q3: What happens internally when a document fails Mongoose validation; where is the request stopped?
**Answer:**  
When `document.save()` or `Model.create()` is executed:
1. Mongoose executes schema validators (type checks, `required`, `enum`, custom validators) **in Node.js memory before** sending a write command to the database.
2. If any field fails validation, Mongoose constructs a `ValidationError` object containing specific failure details and cancels the database operation.
3. **The request is stopped at the application server layer (Mongoose ODM)**, meaning no network call or database query is performed.
4. The execution jumps to the `catch` block/error middleware, returning a structured JSON error response to the client.
