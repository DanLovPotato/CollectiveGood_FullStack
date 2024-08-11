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
  MONGOCONNECT=your_mongodb_connection_string
  MYSQL=your_mysql_database_name
  MYSQL_HOST=your_mysql_host
  MYSQL_USER=your_mysql_username
  MYSQL_PASSWORD=your_mysql_password
  JWT_SECRECT=your_jwt_secret
  JWT_EXPIRES_IN=your_jwt_expiry_time
  JWT_COOKIE_EXPIRES=your_jwt_cookie_expiry_time
  ```

**Run the application:**

```bash
npm start
```
