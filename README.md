**Travel Buddy Finder Application Overview:Travel Buddy Finder is a web application designed to connect travellers who are interested in joining trips organised by other users. The application supports two user roles which includes the Traveller and Trip Creator. Travellers can browse available trips and submit requests to join them. Trip Creators can create trips, view requests for their own trips, and approve or reject those requests.The project is developed for assignment purposes as part of QUT's IFQ636 Software Management unit, using Agile project management practices, GitHub version control, and software testing.. **

**This apps **contain** the following features:**

General -
* Sign up
* Login
* Logout
* Role based access control
* User profile management

* Browse available trips (Traveller)
* View trip details (Traveller)
* Submit requests to join trips (Traveller)

* Create trips with destination, dates and description (Trip Creator)
* View join requests for trips they created (Trip Creator)
* Approve or reject requests (Trip Creator)


Technologies:
Frontend - React, Javascript
Backend - Node.js
Database - MongoDB 
Version Control - Github
Project Management - Jira
Cloud Hosting - AWS EC2

---

**Prerequisite:** Please install the following software and create account in following web tools** **

* **Nodejs [**[https://nodejs.org/en](https://nodejs.org/en)]** **
* **Git [**[https://git-scm.com/](https://git-scm.com/)]** **
* **VS code editor** [[https://code.visualstudio.com/](https://code.visualstudio.com/)]** **
* **MongoDB Account** [[https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)]** - In tutorial, we have also showed how can you create account and database: follow step number 2.**
* **GitHub Account** [[https://github.com/signup?source=login](https://github.com/signup?source=login)]** **

---

Application Workflow:

1. A user registers as a Traveller or Trip Creator.
2. A Trip Creator logs in and creates a trip.
3. A Traveller logs in and browses available trips.
4. The Traveller submits a request to join a trip.
5. The Trip Creator views requests for their own trips.
6. The Trip Creator approves or rejects the request.

---

Development and Testing:

The project was managed using Jira epics, user stories, tasks, and sprints. GitHub feature branches and pull requests were used to manage development. Code review feedback was documented and addressed before merging changes into the main branch.Backend authentication, role based permissions, trip creation, and join request workflows were tested during development.