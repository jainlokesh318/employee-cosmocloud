# Employee Management CRUD Application

This project is a simple Employee Management CRUD application built with Vite, React, and TypeScript. It allows users to view a list of employees, add new employees, and see detailed information for each employee. This application is powered by Cosmocloud APIs for managing employee data.

## Features

- **Employee Listing Page**: View a list of employees with their names and IDs. The page includes functionalities to open an employee's details page and delete an employee.
- **Employee Details Page**: View detailed information about a specific employee.
- **Add Employee Page**: Add a new employee to the system. Each employee has a name, address (line1, city, country, zip code), and a list of contact methods (email or phone).

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/jainlokesh318/employee-cosmocloud.git
   cd employee-cosmocloud
   ```
2. **Install dependencies:**

   ```sh
   npm install
   ```
3. **Set up environment variables:**
  Create a .env file in the root directory of your project and fill it with your specific values as shown below:
   ```sh
   VITE_COSMOCLOUD_ENDPOINT=http://your-cosmocloud-api-endpoint
   VITE_COSMOCLOUD_PROJECTID=your_cosmocloud_projectId
   VITE_COSMOCLOUD_ENVIRONMENTID=your_cosmocloud_environmentId
   ```
