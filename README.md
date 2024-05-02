## Viktoria's solution

This was actually a bit of a challenge since I first tried with the NextUI library, and then decided to do my own components because of time limits. I also hope that I properly understood the challenge the right way, and that I haven't mistaken anything! 


#### Steps
1. First I wanted to fetch all of the assignments to loop them out, and thats why I chose to make the `fetchOneAssignment()`-function first to get one assignment, and then `fetchAllAssignments()` with a promise of returning the results, but also filtering out the 'nullish' assignment.

The list is made with a React Bootstrap Accorderon, where the user can ge an overview of the diffcultylevel, numberm and the question itself.

2. Then, I created a modal to visualize the Figma-mockup and to be able to navigate to next and previous exercises as well as canceling an exercise to go back to the whole list of assignments and closing the modal. There is also hints and solutions to each assignment.

#### Difficulties
I had some difficulties figuring out how my progress-bar should work, as well as the heart-decreasing, so I actually sat with that for a while, but in the end I came up with some sort of solution, but would love to hear from you, a better solution!

The hardest thing was for me to figure out how I should store correct and incorrect answers, but in the end I chose to put the answer inside an object to check if the answer was correct or not. Then, depending on that boolean value, the `.progress-div` changed color accordingly.

--- 


