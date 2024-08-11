## CollectiveGood: Full-Stack Application

This project is a platform designed to present real patient cases to medical students, allowing them to submit diagnosis suggestions. These suggestions are then collected and used to train and improve medical AI models. The platform aims to bridge the gap between traditional medical education and cutting-edge AI technology, fostering collaboration between students and AI development.

## Technology Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, SQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: AWS RDU, AWS Elastic Beanstalk

## Installation

**Install the dependencies:**

```bash
npm install
```

**Set up environment variables:**

- Create a `.env` file in the root directory.

- Add the following environment variables:

  ```txt
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  PORT=your_preferred_port
  SQL_DB=your_sql_database_name
  SQL_USER=your_sql_username
  SQL_PASSWORD=your_sql_password
  SQL_HOST=your_sql_host
  SQL_PORT=your_sql_port
  ```

**Run the application:**

```bash
npm start
```
