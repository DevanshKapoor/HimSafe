# HimSafe: Your Live Guide to Safer Himalayan Travel

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**A real-time, AI-verified road safety platform for the Himalayas. HimSafe provides live, crowdsourced alerts on landslides, road blockages, and weather hazards to make mountain travel safer for everyone.**

---

<!-- It's highly recommended to add a GIF of your app in action here! -->
<!-- ![HimSafe Demo GIF](link-to-your-demo.gif) -->

## 🏔️ The Problem

For residents and tourists in Himachal Pradesh, the stunning beauty of the Himalayas comes with a constant risk: unpredictable and dangerous road conditions. A clear road can become impassable in minutes due to a sudden landslide, heavy snowfall, or an accident. Traditional navigation apps show the route, but they fail to provide critical, real-time information about the *condition* of that route, leaving travelers vulnerable and often stranded.

## 💡 The Solution: HimSafe

HimSafe is a mobile-first platform designed to bridge this information gap. It functions as a real-time intelligence layer on top of the map, empowering a community of travelers to share and consume live data on road hazards.

The system features a dual-verification data pipeline:
1.  **Community Confidence:** Incidents reported by users are instantly visible. As more users in the same area confirm a report, its "confidence score" increases, making it more prominent. This provides rapid, preliminary alerts.
2.  **Automated Verification:** A backend service continuously scans news sources and social media APIs for official reports. When a match is found for a user-submitted incident, it is marked with a "Verified" flag, providing an official layer of trust.

## ✨ Core Features

* **Live Map View:** An interactive map displaying real-time, geotagged incident reports.
* **One-Tap Reporting:** Easily report hazards like landslides, snow, accidents, or traffic with automatic location capture.
* **Proactive Route Analysis:** Input your destination and receive warnings about all known hazards along your planned route *before* you start your journey.
* **Dual Verification System:** See both instant community reports and officially verified incidents.
* **User Authentication:** Secure user profiles for reporting and tracking.

## 🛠️ Tech Stack & Architecture

HimSafe is built on a modern, scalable microservices architecture.

* **Frontend (Client):** `React Native` with `Expo` for cross-platform (iOS/Android) development.
* **Backend (Server):**
    * **Core Geospatial Service:** `Node.js` with `Express.js` for handling primary API requests.
    * **Verification Service:** A separate `Python` service for NLP tasks and parsing external news/social media feeds.
* **Database:** `PostgreSQL` with the `PostGIS` extension for powerful and efficient geospatial queries.
* **Mapping:** `Mapbox API` for customizable maps and route analysis.
* **Containerization:** `Docker` and `Docker Compose` for consistent development and deployment environments.

![Architecture Diagram](https://i.imgur.com/8a6P2vJ.png) <!-- You can create and link your own diagram here -->

## 🚀 Getting Started

### Prerequisites

* Node.js (v18.x or later)
* Docker & Docker Compose
* Expo Go app on your mobile device
* An active Mapbox API key

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/HimSafe.git](https://github.com/YourUsername/HimSafe.git)
    cd HimSafe
    ```

2.  **Setup Backend:**
    * Navigate to the server directory: `cd server`
    * Create a `.env` file from the `.env.example`.
    * Add your PostgreSQL credentials and Mapbox API key to the `.env` file.
    * Install dependencies: `npm install`

3.  **Setup Frontend:**
    * Navigate to the client directory: `cd ../client`
    * Install dependencies: `npm install`

4.  **Launch the System:**
    * From the root directory, start the database and backend services using Docker:
        ```bash
        docker-compose up --build
        ```
    * In a separate terminal, start the client application:
        ```bash
        cd client
        npx expo start
        ```
    * Scan the QR code with the Expo Go app on your phone.

## 🗺️ Project Roadmap

* [ ] **Push Notifications:** Alert users in real-time if a new high-priority incident appears on their active route.
* [ ] **Offline Mode:** Cache map data and recent reports for areas with poor connectivity.
* [ ] **Predictive AI Model:** Develop a machine learning model within the `ai-models` service to predict high-risk landslide zones based on weather forecasts and historical data.
* [ ] **Expanded Data Sources:** Integrate more news and government APIs for faster, more reliable verification.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_Built with ❤️ in Mandi, Himachal Pradesh._
