## Installation

Clone the repo. First ```npm install```, then ```npm run dev```. The app is hosted at ```localhost:3000```.

[Click here for the quick demo](kollin-frontend-challenge.vercel.app)

## My solution
Due to the query structure designed to retrieve a single assignment (not a list), it is not feasible to fetch all assignments at once from the parent component. Instead, each `AssignmentListItem` performs its own fetch. Any valid result from these fetches is then sorted by difficulty score and added to the `validQuestions` state initialized in the `PracticePage` component.

This array contains comprehensive information for all valid questions, such as `questionText`, `answerOptions`, and dates, which are retrieved from the backend. It also includes states such as `status` and `selectedAnswer` that are updated based on user interactions.

After populating the array, we display the assignments one at a time. Each assignment shows the exercise number, update date, and difficulty level, mirroring the presentation on Kollin's website. This is followed by the question text and four answer options. The "Check" button remains disabled until an answer is selected. If the answer is incorrect, the corresponding list item is highlighted in red; if correct, it is green. Also a "toast" is shown on the bottom to give the user feedback. We automatically advance to the next question regardless of the answer's correctness. Since users can navigate between different exercises by clicking on the list, if a user skips a question and answers the last one, the test will automatically jump to the first untouched exercise, ensuring no exercise is overlooked.

Another feature addresses already answered exercises: they cannot be changed. The options and the check button are disabled, and a guiding text explains why this is the case. A `useEffect` hook monitors when all questions in the `validQuestions` state are no longer "untouched." When this occurs, a `CompletedModal` displays the user's results, with each question offering a "Show Solution" button that opens its own new modal `SolutionModal` containing the solution text.

The "hearts" feature is simple: the state initializes in the parent component and decrements with each incorrect answer. Another `useEffect` checks when the hearts count reaches zero to display the `RetryModal`, allowing the user to start over.

The app is (mostly) responsive. For the sake of simplicity, and due to time constraints, some of the parts were left undone.


## Potential improvements

With extra time and effort, the following improvements could be made, (PS. I think I already spent much more time than I should):

* Improved responsiveness.
* Persistence of data (using local storage or a database).
* More intelligent navigation through the list (potentially skipping to the next undone question).
* Gradual revelation of hints data with each click.
* More effective use of the component library.
* Resolution of bugs with the chosen Latex renderer.
* Securing secrets in .env (though they are currently exposed in the README).
* More granular individual commits (perhaps more acceptable given solo development under tight time constraints).

## My thoughts 
Here are some insights from my development experience:

* As a newcomer to GraphQL, I appreciated the ease of connecting to a backend without under- or over-fetching data.
* The requirement for single object queries instead of list queries introduced complexity, especially considering the potential for receiving faulty IDs.
* Transitioning from a TypeScript to a JavaScript environment posed challenges in managing larger objects and functions.

------ 

# A mini Kollin project




- [A mini Kollin project](#a-mini-kollin-project)
  - [The task](#the-task)
    - [Objective](#objective)
    - [Mockup](#mockup)
    - [Instructions](#instructions)
  - [Resources](#resources)
    - [R1. GraphQL API](#r1-graphql-api)
    - [R2. Exercises](#r2-exercises)
  - [Assessment criteria](#assessment-criteria)
  - [Submission](#submission)




Kollin is a startup that provides accessible and interactive study material to university students. Our mission is to make studying at the university more fun and engaging for everyone!

## The task

### Objective
The objective is to create a view that displays a list of Exercises, the user can click on an exercise in the list to view it. Each exercise is a Multiple-choice-question, the user can select an option and press a button to check if their answer is correct. Kind of like Duolingo if you have used it!

### Mockup

![](mockup.png)

Please see the full interactive figma mockup here:
https://www.figma.com/file/9rDWfun0I1TdEfQt5vM4kD/Untitled?type=design&node-id=1%3A6669&mode=design&t=sqgMG34VPQ82y9zs-1

### Instructions
Please see referred resources in the [Resources](#resources) section below

1. Fork this repository
   > [Optional] install a component library of your choice (or use custom-built components) 
   > We are currently using: Next UI (https://nextui.org/)

2. Create the exercise list in app/practice/page.jsx

3. Get the exercises from the API 
   - See: [R1](#r1-graphql-api) for GraphQL API access
   - See: [R2](#r2-exercises) section for data structure specification [] 
4. Render the list of exercises 
5. Automatically redirect to the first exercise in the list. 
   - The list of exercises should remain intact.
   - When the user clicks on an exercise: redirect to that exercise
6. Show the selected Exercise and all metadata 
7. Show the interactive options
8. Provide feedback to the user if they answered correctly or incorrectly when they submit 
9. Reflect their progress in the list of exercises 
10. The user has 3 hearts, if they answer incorrectly they lose a heart. 
    > If they lose all hearts, show a message that they have lost and show an overview of their progress

---

## Resources

### R1. GraphQL API

We use GraphQL for most of our data fetching. You can access the API at the following endpoint:

```
    https://jgsbshesm5advigzznyid7juny.appsync-api.eu-north-1.amazonaws.com/graphql
```

You'll need to authenticate with the following header:

```js
    {
        Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhTVVAwa3ZaUHl3S296bkU1SkNGMW1KbnJnT29CdTRjVHBTMDViQWc4RXMifQ.eyJzdWIiOiIyNjQyMSIsImlkIjoyNjQyMSwiZiI6IjlhOTJmNjMxYzNmNjNkZDgzOGNiNzZjZTcwNDZiNmM5IiwibWF4QWxsb3dlZERldmljZXMiOjEsImdyb3VwcyI6WyJQVUJMSUMiXSwiYXVkIjoiaW50ZXJuYWwiLCJleHAiOjE3MTcxMDE0MDgsImlhdCI6MTcxNDUwOTQwOCwiaXNzIjoiaHR0cHM6Ly9hcGkudG50b3Iuc2Uvb2lkYyJ9.QmNBGduFAihbzKd2ETRQ1DukxHta8_G-CRK8RHtLhAqFDcD9pcK6mbdZCRYx-TKG2Ovyi1LS7MpcG-mYNsq8kNrMOHWVgJtDNyJEjgdYQMFZwsfGikKu5KRNHHf1j8g8tYqEcT7Yw_Azv9uMeiGU1CcL1jGRBhbaqVo3G1pXCxVupHbHsKQn237DC7n2fbaiVVM2S2J1bOFSATbfj35yDJmgZzLOQWqGebl4UkfFZcgWImWcj1IwVRogrCWRK5HZbeElgIu02mlcD8XrFpOV1oFgEnMiMmHjdbgPvm_RX4-FkJTJXUXflVRQYhBFVtOH9bf-t1FTY8FM7kV19uRhHw"
    }
```

The relevant queries are given below

 Note that in the API, an 'exercise' is called `Assignment`

```graphql
  query GetAssignment($id: ID!) {
    getAssignment(id: $id) {
      id
      difficultyScore
      questionText
      solutionText
      hints
      answerOptions {
        id
        text
        correct
      }
      createdAt
      updatedAt
    }
  }
```

### R2. Exercises

The exercises are provided in the file [exercises.json](exercises.json). One of the ID:s in the list is not valid, so you should handle this case gracefully.

Here is an explanation of the fields in the Assignment object:

| Field                   | Type           | Description                              |
| ----------------------- | -------------- | ---------------------------------------- |
| `id`                    | String         | The ID of the exercise                   |
| `difficultyScore`       | Float          | The difficulty of the exercise [1.0-4.0] |
| `questionText`          | String         | The question text                        |
| `solutionText`          | String         | The solution text                        |
| `hints`                 | Array          | Hints for the exercise                   |
| `answerOptions`         | Array\<Object> | The answer options                       |
| `answerOptions.id`      | String         | The ID of the answer option              |
| `answerOptions.text`    | String         | The text of the answer option            |
| `answerOptions.correct` | Boolean        | If the answer option is correct          |



---

## Assessment criteria

The code should be

- clean: no commented code, no linting errors and prettier formatting
- maintainable: easy to understand and extend
- efficient: no unnecessary re-renders or API calls that could be avoided
- reusable: components should be reusable and modular to avoid repetition. 

## Submission

Please submit your solution by creating a pull request to this repository. You can also add a README.md file to explain your solution and any additional notes you would like to add. Good luck!


--- 


