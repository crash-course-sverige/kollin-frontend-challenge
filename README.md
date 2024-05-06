# Installation

To get started with the app, follow these steps:

### Step 1: Clone the Repository

Clone the repository to your local machine

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies by running: `npm install`
If you encounter permission issues, try running the command `sudo npm install`

### Step 3: Run the Application

Once the dependencies are installed successfully, you can start the development server by running: `npm run dev`
This command will build the app and start a development server. You can then access the app in your web browser at `http://localhost:3000` or a different port specified by the application.

### Additional Notes

- Ensure that you have Node.js and npm installed on your system before proceeding.
- Make sure the port 3000 is available and not in use by any other application.
- If you encounter any errors during the installation or execution process, refer to the project's documentation or seek assistance from the project maintainers.

# Application Architecture

![Main Interface](https://github.com/andreamicheli/kollin-frontend-challenge-amicheli/blob/main/public/imageMD.png)

This application is built using Next.js, a React framework that enables server-side rendering and generating static websites for React-based web applications.
For styling purposes, the library Tailwind was used, and for specific templates also the library react-dom-confetti and react-latex.

## Directory Structure

- `API.js`: This file contains the function for fetching data from the API. It uses the Fetch API to make HTTP requests and returns the response data.

- `page.js`: This is the main page component of the application. It uses the `fetchAPI` function from `API.js` to fetch data and pass it to the other components.

- `Card.js`: This component displays a card with information. It receives data as props from `page.js` and displays it.

- `Radio.js`: This component displays a set of radio buttons for user interaction. It handles user input and triggers events based on the user's selection.

- `Lives.js`: This component displays the number of lives left.

- `Progress.js`: This component displays the user's progress and handles navigation among the assignments.

## Important Props

It was chosen, due to the small scope of the application, a simple props-to-child approach for the data flow in the system. Here is an overview of the main props used.

- **assignment:** This prop contains the current assignment or question data. It is used to display the question and options to the user.

- **assignments:** This prop contains the list of all the assignments fetched from the API.

- **selected:** This prop is a state variable that indicates whether an option has been selected. It is used to track the user's current selection.

- **answers:** This prop is a state variable that stores the user's answers. It is used to keep track of the user's answers throughout the game, and their correct or incorrect condition.

- **index:** This prop represents the current index or position in the list of assignments. It is used to navigate through the assignments.

- **lives:** This prop represents the number of lives of the users. When they reach 0, a modal is shown and the user can't play anymore.
