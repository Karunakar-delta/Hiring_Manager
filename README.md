<h1>Hiring Manager Tool (HMT)</h1>

Welcome to the Hiring Manager Tool! This is a simple web application designed to help you manage job applicants. It's built with Node.js for the backend and uses a MySQL database to store all the information.

The best part? We've set it up using Docker, which means you don't need to worry about installing Node.js, MySQL, or any complex software directly on your computer. Docker packages everything nicely into containers, making it super easy to set up and run!

<h2>🚀 Getting Started (No Coding Knowledge Needed!)</h2>
Follow these simple steps to get the Hiring Manager Tool running on your computer.

<h3>Prerequisites (Things You Need Before You Start)</h3>
Before we begin, you'll need two main tools installed on your computer:

<h3>1. Docker Desktop:</h3>

  What it is: Docker Desktop is a free application that helps you run "containers" – these are like small, self-contained packages that include all the code and tools needed for our application to work, without messing with your computer's existing setup.

  How to get it:

  __For Windows:__[Download Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install)

  __For Mac:__ [Download Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

  __For Linux:__ [Download Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

  After installing: Make sure Docker Desktop is running. You'll usually see a Docker whale icon in your system tray (Windows) or menu bar (Mac).

<h3>2. Git:</h3>

What it is: Git is a tool used to download (or "clone") projects from websites like GitHub.

How to get it:

  __For Windows:__ [Download Git for Windows](https://git-scm.com/download/win) (Follow the default installation steps).

  __For Mac:__ Git usually comes pre-installed. You can check by opening your "Terminal" (search for it in Spotlight) and typing git --version. If it's not there, you might be prompted to install it when you first try to use it.

  __For Linux:__ Use your distribution's package manager (e.g., sudo apt install git for Ubuntu/Debian).

<h2>Installation Steps</h2>
Let's get this application running!

__Step 1:__  Download the Project Files:
  Open your Terminal (Mac/Linux) or Command Prompt (Windows).

  On Windows, search for cmd or Command Prompt.

  On Mac, search for Terminal in Spotlight.

  Navigate to where you want to save the project. For example, if you want it in your Documents folder:

    cd Documents

  (You can replace Documents with any folder name you prefer, or just skip this step if you're happy with your default user folder).

 **Download the project:** 
  Copy and paste the following command into your Terminal/Command Prompt and press Enter:

    git clone https://github.com/Karunakar-delta/Hiring_Manager.git

  **Enter the project folder:**

    cd Hiring_Manager 

__Step 2:__ Set Up Your Environment (Important!)
Our application needs some basic settings, like how to connect to the database. These are stored in a special file called .env.

Create the .env file:

  In your project folder (where you just cd'd into), create a new file named exactly .env (no filename, just .env).

  You can do this manually using a text editor (like Notepad on Windows, TextEdit on Mac, or VS Code if you have it).

  Alternatively, in your Terminal/Command Prompt, you can use:

  __Windows:__
    copy NUL .env

  __Mac/Linux__
    touch .env

  Add the following content to your .env file:
  Copy and paste all of the lines below into the .env file you just created:

    DB_HOST=mysql_db
    DB_USER=myuser
    DB_PASS=mypass
    DB_NAME=ApplicantTracking
    DB_PORT=3306
    SECRET='secret'

Explanation: These lines tell your application where to find the database (DB_HOST), what username (DB_USER), password (DB_PASS), and database name (DB_NAME) to use. SECRET is used for security.

Database Setup: You'll notice a folder named initdb in the project. This folder contains special files that Docker uses to automatically set up the MySQL database with the necessary tables when it starts for the first time. You don't need to do anything with this folder, just know it's there!

__Step 3:__ Start the Application
Now, let's fire up Docker and run everything!

Make sure you are still in the project's main folder in your Terminal/Command Prompt.

  __Run the following command:__

    docker-compose up --build -d

  What this command does:

  docker-compose up: Starts all the services defined in our docker-compose.yml file (your Node.js app and the MySQL database).
  
  --build: Tells Docker to build the application's image (the package for your app) from scratch. You only really need to do this the first time or if you change the app's code.
  
  -d: Runs the containers in the "detached" mode, meaning they will run in the background, and you can continue using your Terminal/Command Prompt.
  
  This command might take a few minutes the first time as it downloads necessary images and builds your application. You'll see some output about creating networks, volumes, and containers.

__Step 4:__ Verify It's Running
Once the docker-compose up command finishes, you can check if everything is running correctly:


Check container status:

    docker-compose ps


You should see mysql_db and app containers listed with a status like Up (healthy). The (healthy) part is important!

View application logs (optional, for debugging):
If something seems wrong, you can check the logs for your application or database:

    docker-compose logs app
    docker-compose logs mysql_db

Press Ctrl+C to exit the log viewing.

__Step 5:__ Access the Application:
  Once both mysql_db and app show below messages:

    mysql_db  | 2025-06-27T10:12:01.713386Z 0 [Note] mysqld: ready for connections.
    mysql_db  | Version: '5.7.44'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)     
    app-1     | Server running on port 3002
    app-1     | 🔗 MySQL pool connection created. Thread ID: 3
    app-1     | ⏳ Connection acquired. Thread ID: 3
    app-1     | 🎉 Initial database connection test successful!

Open your web browser (like Chrome, Firefox, Edge, Safari).

Go to this address:

    http://localhost:3001

You should now see the Applicant Tracking System!

<h2>🛑 Stopping the Application</h2>
  When you're done using the application, you can easily stop all the Docker containers:

  Open your Terminal/Command Prompt and navigate to your project's main folder.

  Run this command:

    docker-compose down

This will stop and remove the containers and networks created by docker-compose up. Your database data will be saved in the dbdata volume, so it will be there next time you run docker-compose up.

<h2>❓ Troubleshooting Common Issues</h2>
 <h4>"Port 3001 (or 3307) is already in use" error:</h4>

  Meaning: Another application on your computer is already using that port.

  Solution: Close the application using that port, or you can change the port numbers in your docker-compose.yml file. (This requires a bit more knowledge, so try closing other apps first).

  <h4>Containers not starting or showing (unhealthy):</h4>

  Solution: Check the logs for both your app and mysql_db containers using docker-compose logs app and docker-compose logs mysql_db. The error messages there will give clues about what went wrong.

  <h4>"Can't add new command when connection is in closed state" or "ECONNREFUSED" errors in app logs:</h4>

  Solution: This usually means the app couldn't connect to the database. Make sure Docker Desktop is running, and the mysql_db container is Up (healthy) before trying to start the app. The retry logic in db.js should help with temporary delays. If it persists, ensure your .env file is correct and try docker-compose down -v then docker-compose up --build -d for a fresh start.

Feel free to explore the application! If you have any questions, you can always refer to the project's documentation.
