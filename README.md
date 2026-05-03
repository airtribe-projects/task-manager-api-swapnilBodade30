# Task Manager API

A RESTful API for managing tasks built with Node.js and Express. This API provides CRUD operations for task management with priority levels and completion status tracking.

## Overview

This Task Manager API is a backend engineering assignment that demonstrates:
- RESTful API design with Express.js
- JSON file-based data storage
- Middleware for request validation
- CRUD operations for task management
- Query parameters for filtering
- Error handling and status codes

## Features

- Create, read, update, and delete tasks
- Filter tasks by completion status
- Get tasks by priority level
- Automatic ID assignment
- Data validation using middleware
- JSON file persistence

## Prerequisites

- Node.js version 18.0.0 or higher
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone or Download the Project

```bash
# If cloning from a repository
git clone <repository-url>
cd task-manager-api-swapnilBodade30

# Or download and extract the project folder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
# Development mode with auto-restart
npm start

# Or run directly with node
node app.js
```

The server will start on port 3000. You should see:
```
Server is listening on 3000
```

## API Endpoints

Base URL: `http://localhost:3000/api/v1/tasks`

### 1. Get All Tasks

**Endpoint:** `GET /api/v1/tasks`

**Description:** Retrieves all tasks, optionally filtered by completion status.

**Query Parameters:**
- `completed` (optional): Filter by completion status (`true` or `false`)

**Example Requests:**
```bash
# Get all tasks
curl http://localhost:3000/api/v1/tasks

# Get only completed tasks
curl http://localhost:3000/api/v1/tasks?completed=true

# Get only incomplete tasks
curl http://localhost:3000/api/v1/tasks?completed=false
```

**Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Set up environment",
      "description": "Install Node.js, npm, and git",
      "completed": true
    }
  ],
  "success": true
}
```

### 2. Get Task by ID

**Endpoint:** `GET /api/v1/tasks/:id`

**Description:** Retrieves a specific task by its ID.

**Example Request:**
```bash
curl http://localhost:3000/api/v1/tasks/1
```

**Response:**
```json
{
  "task": {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  },
  "success": true
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

### 3. Get Tasks by Priority Level

**Endpoint:** `GET /api/v1/tasks/priority/:level`

**Description:** Retrieves tasks filtered by priority level.

**Priority Levels:** `low`, `medium`, `high`

**Example Request:**
```bash
curl http://localhost:3000/api/v1/tasks/priority/low
```

**Response:**
```json
{
  "tasks": [
    {
      "id": 4,
      "title": "Install Express",
      "description": "Install Express",
      "completed": false,
      "priority": "low"
    }
  ],
  "success": true
}
```

### 4. Create a New Task

**Endpoint:** `POST /api/v1/tasks`

**Description:** Creates a new task with the provided data.

**Required Fields:**
- `title` (string): Task title
- `description` (string): Task description
- `status` (boolean): Task completion status

**Optional Fields:**
- `priority` (string): Priority level (`low`, `medium`, `high`)

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express.js",
    "description": "Complete Express.js tutorial",
    "status": false,
    "priority": "high"
  }'
```

**Response:**
```json
{
  "task": {
    "id": 16,
    "title": "Learn Express.js",
    "description": "Complete Express.js tutorial",
    "status": false,
    "priority": "high"
  },
  "success": true,
  "message": "Task created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Description, title and status are required"
}
```

### 5. Update a Task

**Endpoint:** `PUT /api/v1/tasks/:id`

**Description:** Updates an existing task with new data.

**Required Fields:**
- `title` (string): Updated task title
- `description` (string): Updated task description
- `status` (boolean): Updated task completion status

**Optional Fields:**
- `priority` (string): Updated priority level

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Set up development environment",
    "description": "Install Node.js, npm, git and VS Code",
    "status": true,
    "priority": "high"
  }'
```

**Response:**
```json
{
  "task": {
    "id": 1,
    "title": "Set up development environment",
    "description": "Install Node.js, npm, git and VS Code",
    "status": true,
    "priority": "high"
  },
  "success": true,
  "message": "Task updated successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

### 6. Delete a Task

**Endpoint:** `DELETE /api/v1/tasks/:id`

**Description:** Deletes a task by its ID.

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/1
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

## Testing the API

### Using curl

You can test all endpoints using curl commands as shown in the examples above. Here's a quick test sequence:

```bash
# 1. Get all tasks
curl http://localhost:3000/api/v1/tasks

# 2. Create a new task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task",
    "status": false,
    "priority": "medium"
  }'

# 3. Get the new task (assuming it got ID 16)
curl http://localhost:3000/api/v1/tasks/16

# 4. Update the task
curl -X PUT http://localhost:3000/api/v1/tasks/16 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Task",
    "description": "This task has been updated",
    "status": true,
    "priority": "high"
  }'

# 5. Delete the task
curl -X DELETE http://localhost:3000/api/v1/tasks/16
```

### Using Postman

1. Import the following collection into Postman:
   - Base URL: `http://localhost:3000/api/v1/tasks`
   - Create requests for each endpoint with the appropriate methods and parameters

2. Test endpoints in this order:
   - GET all tasks
   - POST new task
   - GET task by ID
   - PUT update task
   - DELETE task
   - GET tasks by priority

### Using API Testing Tools

You can use tools like:
- **Postman**: GUI-based API testing
- **Insomnia**: API client with environment management
- **HTTPie**: Command-line HTTP client
- **REST Client**: VS Code extension for API testing

## Data Structure

Tasks are stored in `task.json` with the following structure:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "completed": true,
      "priority": "low"
    }
  ]
}
```

### Task Fields

- `id` (number): Unique identifier (auto-assigned)
- `title` (string): Task title (required)
- `description` (string): Task description (required)
- `completed` (boolean): Completion status (required)
- `priority` (string): Priority level - `low`, `medium`, `high` (optional, defaults to `low`)

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found (task doesn't exist)
- `500`: Internal Server Error

All error responses include:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Development

### Running Tests

```bash
npm test
```

### Project Structure

```
task-manager-api-swapnilBodade30/
├── app.js                 # Main application file
├── package.json          # Dependencies and scripts
├── task.json             # Data storage
├── README.md             # This file
├── controller/
│   └── taskController.js # Business logic
├── middleware/
│   └── taskMiddleware.js # Request validation
└── routes/
    └── taskRoutes.js     # API routes
```

## License

ISC License
