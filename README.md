# Product Filtering Website - Frontend

## Overview
This is the frontend repository for a fullstack MERN-based single-page website that allows users to search, filter, paginate, and sort products. The frontend is built with React.js and interacts with the backend APIs to display and manage product data.

## Features
- **Product Display:** View a list of products with their details including name, image, description, price, category, ratings, and creation date.
- **Search Functionality:** Search for products by name.
- **Categorization:** Filter products by brand name, category name, and price range.
- **Pagination:** Navigate through product pages using pagination controls.
- **Sorting:** Sort products by price (low to high, high to low) and by date added (newest first).
- **Authentication:** Google and Email/Password authentication using Firebase.
- **Responsive Design:** Mobile-first design approach ensuring a fully responsive experience.

## Project Setup

### Prerequisites
- Node.js and npm installed on your machine.
- Ensure that the backend server is running (see backend setup instructions).

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/frontend-repo.git
   cd frontend-repo
2. **Install Dependencies**
   ```bash
   npm install
3. **Environment Variables**
Create a .env file in the root directory and add the following variables:
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
4. **Start the Development Server**

   ```bash
   npm start


The app will be available at http://localhost:3000.
