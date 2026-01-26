// PSITS Developer Portal Data
export const docsStats = {
  apiEndpoints: 11,
  features: 4,
  services: 4
};

export const apiEndpoints = [
  {
    id: "auth-login",
    method: "POST",
    url: "/api/login",
    title: "User Login",
    description: "Authenticate a user using ID number and password to receive a JWT token.",
    version: "v1",
    access: "Public",
    parameters: [
      { field: "id_number", type: "string", required: true, description: "Student ID number (8 digits) or Admin ID (with -admin suffix)" },
      { field: "password", type: "string", required: true, description: "User password" }
    ],
    exampleRequest: {
      curl: `curl -X POST \\
  http://localhost:5000/api/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "id_number": "12345678",
    "password": "your_password"
  }'`,
      javascript: `const response = await fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id_number: '12345678',
    password: 'your_password'
  })
});

const data = await response.json();`
    },
    exampleResponse: {
      status: "200 OK",
      body: `{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "Student",
  "campus": "UC-Main"
}`
    }
  },
  {
    id: "auth-register",
    method: "POST",
    url: "/api/register",
    title: "User Registration",
    description: "Register a new student account with email verification.",
    version: "v1",
    access: "Public",
    parameters: [
      { field: "id_number", type: "string", required: true, description: "Student ID number (8 digits)" },
      { field: "email", type: "string", required: true, description: "Valid email address" },
      { field: "password", type: "string", required: true, description: "Password (min 8 characters)" },
      { field: "first_name", type: "string", required: true, description: "First name" },
      { field: "last_name", type: "string", required: true, description: "Last name" },
      { field: "campus", type: "string", required: true, description: "Campus location" }
    ],
    exampleRequest: {
      curl: `curl -X POST \\
  http://localhost:5000/api/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "id_number": "12345678",
    "email": "student@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "campus": "UC-Main"
  }'`,
      javascript: `const response = await fetch('http://localhost:5000/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id_number: '12345678',
    email: 'student@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    campus: 'UC-Main'
  })
});`
    },
    exampleResponse: {
      status: "200 OK",
      body: `{
  "message": "Registration successful. Please check your email for verification."
}`
    }
  },
  {
    id: "student-profile",
    method: "GET",
    url: "/api/student/profile",
    title: "Get Student Profile",
    description: "Retrieve authenticated student's profile information.",
    version: "v1",
    access: "Student",
    parameters: [],
    exampleRequest: {
      curl: `curl -X GET \\
  http://localhost:5000/api/student/profile \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
      javascript: `const response = await fetch('http://localhost:5000/api/student/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});`
    },
    exampleResponse: {
      status: "200 OK",
      body: `{
  "id_number": "12345678",
  "email": "student@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "campus": "UC-Main",
  "status": "True",
  "membership_status": "Active"
}`
    }
  },
  {
    id: "admin-events",
    method: "GET",
    url: "/api/admin/events",
    title: "Get All Events",
    description: "Retrieve all events for admin management.",
    version: "v1",
    access: "Admin",
    parameters: [],
    exampleRequest: {
      curl: `curl -X GET \\
  http://localhost:5000/api/admin/events \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
      javascript: `const response = await fetch('http://localhost:5000/api/admin/events', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});`
    },
    exampleResponse: {
      status: "200 OK",
      body: `[
  {
    "id": "event_123",
    "title": "PSITS Annual Convention",
    "description": "Annual gathering of IT students",
    "date": "2024-03-15",
    "location": "UC Main Campus",
    "attendees": 150
  }
]`
    }
  },
  {
    id: "student-cart",
    method: "GET",
    url: "/api/student/cart",
    title: "Get Student Cart",
    description: "Retrieve items in student's shopping cart.",
    version: "v1",
    access: "Student",
    parameters: [],
    exampleRequest: {
      curl: `curl -X GET \\
  http://localhost:5000/api/student/cart \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
      javascript: `const response = await fetch('http://localhost:5000/api/student/cart', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});`
    },
    exampleResponse: {
      status: "200 OK",
      body: `[
  {
    "product_id": "prod_123",
    "name": "PSITS T-Shirt",
    "price": 250,
    "quantity": 2,
    "size": "M"
  }
]`
    }
  }
];

export const featureCategories = [
  { id: "all", name: "All Features", icon: "fas fa-th" },
  { id: "security", name: "Security", icon: "fas fa-shield-alt" },
  { id: "events", name: "Events", icon: "fas fa-calendar-alt" },
  { id: "management", name: "Management", icon: "fas fa-users-cog" },
  { id: "commerce", name: "Commerce", icon: "fas fa-shopping-cart" }
];

export const features = [
  {
    id: "authentication-system",
    title: "Authentication System",
    category: "security",
    description: "Secure JWT-based authentication with email verification and password recovery. Supports student and admin roles with campus-based access control.",
    implementationFlow: "User registers → Email verification → Login → Receive JWT token → Use token for authenticated requests",
    relatedEndpoints: [
      "/api/login",
      "/api/register",
      "/api/logout",
      "/api/forgot-password",
      "/api/reset-password"
    ],
    tags: ["Security", "JWT", "Email Verification"]
  },
  {
    id: "event-management",
    title: "Event Management",
    category: "events",
    description: "Comprehensive event creation and management system with QR code attendance tracking, raffle system, and real-time statistics.",
    implementationFlow: "Admin creates event → Students register → QR code generation → Attendance tracking → Raffle system → Statistics",
    relatedEndpoints: [
      "/api/admin/events",
      "/api/student/events",
      "/api/admin/attendance/:eventId",
      "/api/admin/raffle/:eventId"
    ],
    tags: ["Events", "QR Codes", "Attendance", "Raffle"]
  },
  {
    id: "membership-system",
    title: "Membership System",
    category: "management",
    description: "Complete membership lifecycle management including registration, approval workflow, renewal process, and membership history tracking.",
    implementationFlow: "Student applies → Admin reviews → Approval/Rejection → Membership activation → Renewal reminders → History tracking",
    relatedEndpoints: [
      "/api/admin/students/request",
      "/api/admin/students/renewal",
      "/api/admin/students/history",
      "/api/student/membership"
    ],
    tags: ["Membership", "Approval Workflow", "Renewal"]
  },
  {
    id: "merchandise-system",
    title: "Merchandise System",
    category: "commerce",
    description: "Full e-commerce functionality for PSITS merchandise including product management, shopping cart, order processing, and inventory tracking.",
    implementationFlow: "Admin adds products → Students browse → Add to cart → Place order → Payment processing → Order fulfillment → Inventory updates",
    relatedEndpoints: [
      "/api/admin/merchandise",
      "/api/student/merchandise",
      "/api/student/cart",
      "/api/student/orders"
    ],
    tags: ["E-commerce", "Inventory", "Orders", "Cart"]
  }
];

export const quickLinks = [
  { name: "API Status", url: "/docs/api-status" },
  { name: "Changelog", url: "/docs/changelog" },
  { name: "Support", url: "/docs/support" }
];
