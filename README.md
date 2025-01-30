# Full-Stack Task Manager

This is a full-stack Task Manager application built using HTML, CSS, JavaScript for the frontend, and Node.js, Express.js for the backend with MongoDB as the database. The app allows users to manage tasks with features like creating, reading, updating, and deleting tasks.

## Features

- User Authentication (Register/Login)
- Add, View, Edit, and Delete tasks
- Dark Mode Toggle
- Fully responsive and interactive UI
- Token-based authentication (JWT)

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - DOM Manipulation
  - Fetch API
- **Backend**:
  - Node.js
  - Express.js
  - JWT (JSON Web Token)
  - Bcrypt.js (for password hashing)
- **Database**:
  - MongoDB (via MongoDB Atlas)

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.

  - Request body:
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
  - Response:
    ```json
    { "message": "Registration successful!" }
    ```

- **POST /api/auth/login**: Login and get a JWT token.
  - Request body:
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
  - Response:
    ```json
    { "token": "JWT_TOKEN" }
    ```

### Tasks

- **POST /api/tasks**: Create a new task.

  - Request body:
    ```json
    {
      "title": "Task Title",
      "description": "Task description",
      "priority": "Low/Medium/High",
      "dueDate": "YYYY-MM-DD"
    }
    ```
  - Response:
    ```json
    { "message": "Task created successfully!" }
    ```

- **GET /api/tasks**: Get all tasks.

  - Response:
    ```json
    [
      {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task description",
        "priority": "Low/Medium/High",
        "dueDate": "YYYY-MM-DD",
        "status": "In Progress/Done"
      }
    ]
    ```

- **GET /api/tasks/:id**: Get a single task by ID.

  - Response:
    ```json
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task description",
      "priority": "Low/Medium/High",
      "dueDate": "YYYY-MM-DD",
      "status": "Pending/Completed"
    }
    ```

- **PUT /api/tasks/:id**: Update a task.

  - Request body:
    ```json
    {
      "title": "New Task Title",
      "description": "Updated Task Description",
      "priority": "Low/Medium/High",
      "dueDate": "YYYY-MM-DD",
      "status": "In Progress/Done"
    }
    ```
  - Response:
    ```json
    { "message": "Task updated successfully!" }
    ```

- **DELETE /api/tasks/:id**: Delete a task.
  - Response:
    ```json
    { "message": "Task deleted successfully!" }
    ```

## Frontend Instructions

1. **index.html**: The dashboard where users can view, add, and delete tasks.
2. **register.html**: Registration form to create a new user.
3. **login.html**: Login form to authenticate users.
4. **task-modal**: A modal for adding new tasks with form inputs for title, description, priority, and due date.
5. **Dark Mode**: A dark mode toggle that saves the user's preference in `localStorage`.

### Setup & Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/armansdev/Task-Manager.git
   cd Task-Manager
   ```

2. **Backend Setup**:

   - Install dependencies:
     ```bash
     cd Server
     npm install
     ```
   - Create a `.env` file in the backend directory and add the following:
     ```bash
     PORT=5500
     MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/taskmanager
     JWT_SECRET=yourjwtsecretkey
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Open the `index.html` in your browser.
   - Ensure the frontend makes requests to the correct backend API URL (`http://localhost:5500/api`).

### Features in Progress

- **Task priority**: Tasks can be set to `Low`, `Medium`, or `High`.
- **Status Tracking**: Users can track whether a task is `To Do`, `In Progress` or `Done`.

## Contributing

Feel free to open an issue or submit a pull request if you find bugs or want to suggest improvements!

## License

This project is licensed under the MIT License.
