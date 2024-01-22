# Email List Management with SendGrid

## Project Overview

This project is designed to manage an email list using SendGrid's powerful API, Firebase Firestore for data storage, and Firebase Auth for user authentication. It allows users to opt-in or opt-out of email communications, automatically updating their preferences in SendGrid.

### Key Features

- **User Authentication**: Secure login system using Firebase Auth.
- **Email List Opt-In/Opt-Out**: Allows users to opt in or out of the email list, leveraging SendGrid's API.
- **Dynamic Contact Management**: Automatically updates the SendGrid contact list based on user preferences.
- **Firebase Integration**: Uses Firebase Firestore for storing user data and Firebase Auth for authentication.

# Component Overview

## Login.tsx

Functionality: Manages user login using Firebase Auth. Users can sign in with their email and password.
Key Methods:
handleSignIn: Authenticates the user with Firebase and handles any login errors.

## Opt.tsx

Functionality: Allows authenticated users to opt in or out of the email list. Reflects changes in both Firestore and SendGrid.
Key Features:
Displays user's current opt-in status.
Checkbox for opting in or out.
Updates user's opt-in preference in Firestore and SendGrid

## sendgrid.ts (API Endpoint)

Functionality: Handles adding or removing users from the SendGrid list based on the opt-in status stored in Firestore.
Key Operations:
Add User: Adds a user to the SendGrid list when they opt in.
Remove User: Removes a user from the SendGrid list and from all contacts when they opt out.

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Firebase account
- SendGrid account

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jacklion710/user-interactive-email-list.git
   cd user-interactive-email-list
   npm install
   npm run dev
   ```

2. **Install Dependencies**
Run the following command to install the necessary dependencies:

    ```bash
    npm install
    ```
3. **Run the Development Server**
Start the development server with:

    ```bash
    npm run dev
    ```

4. **Set Environment Variable**
Create a .env.local file in the root directory and add your Firebase and SendGrid API keys:

    ```bash
    NEXT_PUBLIC_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_MESSAGING_SENDER_ID=your_firebase_sender_id
    NEXT_PUBLIC_APP_ID=your_firebase_app_id
    NEXT_PUBLIC_MEASUREMENT_ID=your_firebase_measurement_id
    SENDGRID_API_KEY=your_sendgrid_api_key
    ```

### Built With
React - A JavaScript library for building user interfaces
Firebase - Backend-as-a-Service for web and mobile apps
SendGrid - Cloud-based email service that assists businesses with email delivery
Chakra UI - A simple, modular, and accessible component library