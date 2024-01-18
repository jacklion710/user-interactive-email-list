# Email List Management with SendGrid

## Project Overview

This project demonstrates the integration of SendGrid's API for managing email marketing contacts. It focuses on adding and removing contacts from an audience list, showcasing how to leverage SendGrid for email marketing purposes effectively.

### Key Features

- **User Authentication**: Secure login system using Firebase Auth.
- **Email List Opt-In/Opt-Out**: Allows users to opt in or out of the email list, leveraging SendGrid's API.
- **Dynamic Contact Management**: Automatically updates the SendGrid contact list based on user preferences.
- **Firebase Integration**: Uses Firebase Firestore for storing user data and Firebase Auth for authentication.

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Firebase account
- SendGrid account

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

2. **Set Environment Variable**
Create a .env file in the root directory and add your Firebase and SendGrid API keys:

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