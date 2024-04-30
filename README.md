
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
[Optional] install a component library of your choice (or use custom-built components)
    
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


