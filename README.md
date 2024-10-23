# CRM API Project

## Overview

This project is a Customer Relationship Management (CRM) API system designed to manage campaigns and leads efficiently. The system automates database population, sends email notifications for campaign updates, generates PDF reports, and dynamically creates fake data for testing purposes using Faker.js.

## Key Features

1. **Automated Database Population**: A cron job that runs daily at 12 AM to populate the database. Also checks are madee if the backend was down at 12 or started for the first time even in that case db is populated, ensuring no duplicated entries.
2. **Email Notifications**: Sends an email notification to yourself using Nodemailer after each database population. The email includes:
   - Campaigns about to finish today.
   - Newly fetched campaigns.
   - Updates on leads that have been converted.
3. **PDF Generation**: Provides a PDF report using PDFKit of newly fetched and updated campaigns via an API endpoint. It uses an ETL (Extract, Transform, Load) process as middleware to extract relevant data from the database.
4. **Dynamic Data Generation**: Includes a separate endpoint (found in [campaign-api](https://github.com/Shahid33Ali/campaign-api)) for generating dynamic campaign data using Faker.js. This endpoint returns 10 documents by default but can be customized via a query parameter (`num`).
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

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shahid33Ali/CRM-api.git
