# CRM API Project

## Overview

This project is a Customer Relationship Management (CRM) API system designed to manage campaigns and leads efficiently. The system automates database population, sends email notifications for campaign updates, generates PDF reports, and dynamically creates fake data for testing purposes using Faker.js.

## Key Features

1. **Automated Database Population**: A cron job that runs daily at 12 AM to populate the database. Also checks are made if the backend was down at 12 or started for the first time even in that case db is populated, ensuring no duplicated entries.
2. **Email Notifications**: Sends an email notification to yourself using Nodemailer after each database population. The email includes:
   - Campaigns about to finish today.
   - Newly fetched campaigns.
   - Updates on leads that have been converted.
3. **PDF Generation**: Provides a PDF report using PDFKit of newly fetched and updated campaigns via an API endpoint. It uses an ETL (Extract, Transform, Load) process as middleware to extract relevant data from the database.
4. **Dynamic Data Generation**: Includes a separate endpoint (found in [campaigns-api](https://github.com/Shahid33Ali/campaigns-api)) for generating dynamic campaign data using Faker.js. This endpoint returns 10 documents by default but can be customized via a query parameter (`num`).
5. **Moment.js Integration**: Moment.js is used for handling time-related functionalities like scheduling cron jobs and managing campaign deadlines.

## Technologies Used

- **Node.js**: Runtime environment for executing the server-side code.
- **Express.js**: Web framework for creating API routes.
- **MongoDB**: Database used to store campaigns and leads.
- **Mongoose**: MongoDB object modeling tool.
- **Nodemailer**: Used for sending email notifications.
- **PDFKit**: Library for generating PDF documents.
- **Moment.js**: For date and time formatting, managing cron job schedules.
- **Faker.js**: Generates dynamic fake data for testing.
- **cron**: To schedule the database population at specific times.

## Setup Instructions

 **Clone the Repository**:
   ```bash
   git clone https://github.com/Shahid33Ali/CRM-api.git
```
## Navigate to the Project Directory:

```bash
cd CRM-api
```
## Install Dependencies:

```bash
npm install
```
## .env setup 
```
MONGO_URL=your mongodb url
MY_EMAIL="gmail id"
MY_PASSWORD="App password generated on gmail account 16chars without spaces"
API_END_POINT=http://localhost:5000/api/campaigns 'api end point for db population'

```
## Start the Server:

```bash
nodemon src/index.ts
```
## Test the API Endpoints: Use Postman or any API testing tool to interact with the following endpoints for PDF Generation:


- **GET** `/generate/pdf`
  
This endpoint generates a PDF report of newly fetched and updated campaigns.
Dynamic Campaign Data (from the separate project):

## In the [campaigns-api](https://github.com/Shahid33Ali/campaigns-api) repository which has the fake campaigns listed:
Wew can expect the data in this format:
```json
[
  {
    "name": "Spring Sale",
    "startDate": "2024-03-01T00:00:00Z",
    "endDate": "2024-03-31T23:59:59Z",
    "leads": [
      {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "converted": true
      },
      {
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "converted": false
      }
    ],
    "fetchedAt": "2024-10-23T12:00:00Z"
  },
  {
    "name": "Summer Promo",
    "startDate": "2024-06-01T00:00:00Z",
    "endDate": "2024-06-30T23:59:59Z",
    "leads": [
      {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "converted": false
      }
    ],
    "fetchedAt": "2024-10-23T12:00:00Z"
  }
]

```
### Api end point 

- **GET** `/api/campaigns?num=20`

This endpoint returns 20 random campaign documents by default.
You can customize the number of campaigns by adjusting the num query parameter (e.g., ?num=20 to get 20 documents).
## Important Notes
Make sure to set up your environment variables correctly for email notifications.
The cron job will populate the database daily at 12 AM.
The PDF generation endpoint uses ETL to format data for reports.
