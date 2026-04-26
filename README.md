
# Digital Menu App - Frontend

## Description

BACKEND REPOSITORY - https://github.com/amratansh12/digital-menu-api

The Digital Menu App is an innovative solution for restaurants to digitize their menus using QR codes. It features role-based authentication for Admins and Users, allowing restaurant managers to easily create and manage menus and orders, and enabling users to conveniently browse menus and place orders through a QR code scan.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Role-Based Authentication**: Secure login/signup for Admin and User roles.
- **Admin Capabilities**: Create and manage restaurants and menus, view and update orders, and generate QR codes.
- **User Capabilities**: Scan QR codes to view menus, add items to cart, and place orders with payment through Razorpay.
- **QR Code Integration**: Quick access to restaurant menus via QR code scans.
- **Order Management**: Seamless order placement and tracking for users and management for admins.

## Technologies Used

### Frontend

- **ReactJS**: For building the user interface.
- **ViteJS**: As the development server and build tool.
- **TailwindCSS**: For styling the application.
- **Shadcn-UI**: For pre-designed UI components.
- **Axios**: For making HTTP requests.
- **Zustand**: For state management.
- **JWT Decode**: For decoding JSON Web Tokens.
- **React-Hook-Forms**: For managing form state and validation.
- **Zod**: For schema validation.
- **TypeScript**: For type safety.
- **React Router DOM**: For client-side routing.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.22.x)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/amratansh12/digital-menu.git
    ```
2. Navigate to the project directory:
    ```bash
    cd digital-menu
    ```
3. Install dependencies:
    ```bash
    npm install
    or
    yarn install
    ```
4. Create a `.env` file in the root directory and add the necessary environment variables. 
    ```bash
    VITE_BACKEND_URL=<your_backend_url>
    ```

5. Start the development server:
    ```bash
    npm run dev
    or
    yarn dev
    ```

## Usage

### Admin Role

1. **Login/Signup**: Admins can login or sign up through the provided forms.
2. **Create/Join Restaurant**: Admins can create a new restaurant or join an existing one by providing relevant details.
3. **Manage Restaurants**: Admins can view all their associated restaurants and manage them.
4. **Create Menu Items**: Admins can add new menu items to their restaurants.
5. **Generate QR Codes**: Admins can generate QR codes for restaurants.
6. **View and Update Orders**: Admins can monitor and update the status of orders.

### User Role

1. **Login/Signup**: Users can login or sign up through the provided forms.
2. **Scan QR Code**: Users can scan a restaurant's QR code to view its menu.
3. **Order Food**: Users can select items, add them to the cart, and place orders.
4. **Payment**: Users can pay for their orders using Razorpay.
5. **View Orders**: Users can view their past orders.


## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add your feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

Please ensure that your code adheres to our coding guidelines and includes appropriate tests.

## Contact

For any questions or suggestions, please contact:

- **Name**: Amratansh Shrivastava
- **Email**: ashri1205@gmail.com
- **GitHub**: [amratansh12](https://github.com/amratansh12)
# DMNF
