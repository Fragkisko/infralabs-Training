How to Run Infralabs-Test-25.10
Step 1: Download the Files from GitHub Download the repository to your local machine .

Step 2: Install Node.js If you haven't already, download and install Node.js from the official website: Node.js.

Step 3: Verify the Installation To ensure that Node.js and npm (Node Package Manager) have been installed correctly, open your command prompt and run: node -v npm -v You should see version numbers for both Node.js and npm, indicating a successful installation.

Step 4: Navigate to the Application Directory In the command prompt, navigate to the directory of the application: cd full-path-to-the-app

Step 5: Install OpenLayers Once inside the application directory, install the OpenLayers library by running: npm install ol

Step 6: Start the Application To run the application, use the following command: npm start

Step 7: Access the Application Open your preferred web browser (for example, Mozilla Firefox) and go to: http://localhost:5173 You should see the application running.

Note: To run the application with different data (different from what is provided in the mockData.json file), it needs to be done dynamically. This involves modifying the code, specifically the content of the var mockData in index.js, and essentially replacing the existing data with the new data.
