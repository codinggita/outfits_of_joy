# outfits_of_joy

## Figma Design Link  
[OutfitsOfJoy Figma Design](https://www.figma.com/design/Ccb55yT6IzEFeFS8JaOTdJ/RENT-CLOTHES?node-id=0-1&t=saeITUgTOqgkmeV7-1)

## Postman Documentation Link  
[API Documentation Link](https://documenter.getpostman.com/view/39190159/2sAYQcEVQx)


Outfits of Joy is a **clothing rental website** that allows users to rent fashionable outfits for various occasions. The platform provides a seamless experience for users to browse, favorite, add to cart, and rent clothes. It also includes dedicated sections for collections, orders, and detailed views of each clothing item.


## User Flow Diagram

Here's a visual representation of the user journey through the Outfits of Joy platform:
[Download User Flow Diagram (SVG)](/Client/public/ofj_userflow.svg)

![User Flow Diagram](/Client/public/ofj_userflow.svg)


## Backend Architecture & Data Flow

Here's a visual representation of the backend architecture and data flow for Outfits of Joy:
[Download Backend Architecture Diagram (SVG)](/Client/public/ofj_backend.svg)

![Backend Architecture Diagram](/Client/public/ofj_backend.svg)

---

## Features

- **User Authentication**:
  - Users can register, log in, and manage their profiles.
  
- **Clothing Collections**:
  - Dedicated collections for different types of clothing (e.g., Sherwani, Tuxedo, lehenga etc).

- **Cloth Details**:
  - Each clothing item displays details such as:
    - Rent price
    - MRP (Maximum Retail Price)
    - Deposit amount
    - Select Date to rent

- **User Cart**:
  - Users can add clothes to their cart for renting.
  - Manage cart items (update quantity, remove items).

- **Favorites**:
  - Users can save their favorite clothes for future reference.

- **Order Section**:
  - Users can view their rental history and track current orders.

- **Admin Panel**:
  - Admins can add, update, or remove clothing items.
  - Manage user orders and collections.

---

## Technologies Used

- **Frontend**:
  - **React**: Frontend library for UI development.
  - **Auth0**: For secure user authentication.
  - **React Toastify**: For showing user-friendly notifications.
  - **React Router DOM**: For navigation and routing.
  - **Axios**: For handling API requests.
  - **Tailwind CSS**: For styling.

- **Backend**:
  - **Node.js**: JavaScript runtime for building the server.
  - **Express.js**: Web framework for designing server routes.
  - **MongoDB**: NoSQL database for storing user, clothing, and order data.
  - **JWT (JSON Web Tokens)**: Used for authentication and session management.
  - **Cloudinary**: For storing and managing images of clothing items.
  - **Multer**: Middleware for handling file uploads.


- **Other Tools**:
  - **Postman**: For testing API endpoints.
  - **Git**: For version control.


