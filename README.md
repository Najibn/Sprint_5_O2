Admin Frontend
********************************************************************

This is a modern,AI assisted responsive admin dashboard project  built with React, Vite, and Material UI. 
It provides full CRUD operations for users, products, and maintenance records, with protected routing and role-based access control.

Selected AI Model
-------------------
Model Chosen: ChatGPT (GPT-4) and DEEPSEEK

## Reason for Choice:
The AI was selected because of its ability to generate interactive clean, structured code and assist with both frontend and backend development tasks.
It offered natural language interaction and quick turnaround for coding help.

AI Interaction Log
-------------------------
Prompt: "in a minimal statement distinguish between viu js and raect."
- AI Response: One-Liner Wisdom:
Vue feels like Laravel’s best friend.
React feels like the world’s most popular power tool..

Prompt: "Generate a Laravel API with login, user management, and product CRUD."
- AI Response: Provided routes, controllers, and middleware setup for auth and REST endpoints.

Prompt: "Create a React dashboard page that shows user, product, and maintenance stats."
- AI Response: Output a responsive MUI-based dashboard using hooks and icons.

Prompt: "Add role-based routing to React using ProtectedRoute and AdminRoute components."
- AI Response: Gave modular route protection structure with example usage.

Features
---------------------
- Authentication & Authorization (passport-based)
- User Management (Create, Read, Update, Delete)
- Product Management
- Maintenance Records Management
- Dashboard Statistics
- Protected & Admin-Only Routes
- Material UI (MUI) for responsive and consistent UI
- Axios for API communication
- Form validation with Formik and Yup
- Code linting with ESLint

 Modifications Made:
------------------------
- Restructured file and folder naming for better scalability (/pages/Users, /pages/Products, etc.)
- Refined API URL references to point to correct Laravel backend (http://localhost:8000/api)
- Improved error feedback on login page etc

 
Project Structure
------------------------------------
src/
├── api/               # API service functions
│   ├── auth.js
│   ├── maintenanceRecords.js
│   ├── products.js
│   └── users.js
├── components/        # Reusable components
│   ├── Layout/
│   │   ├── AdminLayout.jsx
│   │   └── Navbar.jsx
│   ├── MaintenanceRecords/
│   │   ├── MaintenanceRecordForm.jsx
│   │   └── MaintenanceRecordsTable.jsx
│   ├── Products/
│   │   ├── ProductForm.jsx
│   │   └── ProductsTable.jsx
│   └── Users/
│       ├── UserForm.jsx
│       └── UsersTable.jsx
├── pages/             # Main pages
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── MaintenanceRecords/
│   │   ├── CreateMaintenanceRecord.jsx
│   │   ├── EditMaintenanceRecord.jsx
│   │   └── ListMaintenanceRecords.jsx
│   ├── Products/
│   │   ├── CreateProduct.jsx
│   │   ├── EditProduct.jsx
│   │   └── ListProducts.jsx
│   └── Users/
│       ├── CreateUser.jsx
│       ├── EditUser.jsx
│       └── ListUsers.jsx
├── utils/             # Utility functions
│   ├── auth.js
│   └── http.js
├── App.jsx
└── main.jsx


 Installation
 ---------------------------------
 git clone https:repo-here-admin-frontend.git
 cd admin-frontend
- install dependencies: npm install
- start the dev server: npm run dev
The app will run at (default Vite port) : http://localhost:5173 .


Authentication
------------------------------------
- passport tokens are stored in localStorage
- Tokens are attached to requests in the Authorization header
- Includes route guards for:
- Logged-in users
- Admin-only access

   API Configuration
  ---------------------------------
- All API requests are made to: http://localhost:8000/api
- (Ensure the backend API is running and configured with matching endpoints:eg /login, /logout, /refreshToken/users, /products, /maintenance_records)

  Example Pages
  ---------------------------------------------
- /login — Authentication page
- /dashboard — Overview stats for admin
- /users — Manage user accounts
- /products — Manage product listings
- /maintenance-records — Manage maintenance data

- Technologies Used and Frontend–Backend Connection
------------------------------------------------

- Tool	Purpose
- React 19	UI Framework
- Vite	Build & Dev Server
- Material UI	Component Library
- Axios	HTTP Requests
- React Router v7	Routing
- Formik + Yup	Forms & Validation
-  ESLint	Linting & Code Quality

-   Connection Process:
    -----------------------------
-   Laravel provided /api routes secured with tokens (passport)
-   Axios was used in the frontend to authenticate and interact with the backend
-   localStorage stores tokens for authorization headers in all API calls

-   Challenges and Solutions:
-   Protected Routes — Used custom React wrappers (ProtectedRoute, AdminRoute) to enforce auth and roles
-   Token Handling — Used localStorage to persist across sessions
-   CORS Errors — Resolved using Laravel CORS middleware

-   Learning Reflection:
 --------------------------
This project was a valuable experience in integrating AI tools into a real-world workflow.

What I learned:
- How to prompt effectively to get useful code from AI
- React component lifecycle and route-based rendering
- Laravel controller and middleware logic
- Token-based authentication with Axios

- Challenges:
--------------------
- Adapting AI output to our specific folder structure
- Debugging inconsistent token expiration behavior
- Harmonizing different coding styles and conventions

 
