# Backstage Docker Service

The **backstage-docker-service** is a simple Node.js server that returns a "Hello, world!" message.

## Overview

The **backstage-docker-service** component is a backend service built with Node.js and Express. It exposes a single endpoint that responds with a "Hello, world!" message.

## Setup

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. Run the following command to install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Service Locally

1. Make sure you're in the root directory of the component.
2. Run the following command to start the server:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```
3. The service will start listening on port 3000. You can access it at http://localhost:3000.

### Endpoints

- **GET /:** Returns a "Hello, world!" message.

## Usage

The **backstage-docker-service** component integrated with [Backstage application](https://github.com/SvitlanaRybakova/bakckstage)
