.env.local needs to be created with the keys <GRAPHQL_ENDPOINT> and <GRAPHQL_KEY>

Assignments are fetched from GraphQL server side in the page component, and is passed as a prop to the Gameboard component, where it is re-mapped with some additional fields to keep track of user interaction.

The instructions of this assignment left some room for interpretation, so this is how my version works:

The user can click the sections in the progressbar to go to any question they wish, and can answer questions in any order.

When a question is answered and checked, it is set in stone and can not be changed that round. When a question is checked a modal appears, showing if the users answer was correct or not, showing the solution text, and displaying a button. The button have different actions depending on game state. If all questions are answered, it takes the user to the result modal. If not, it redirects to the next unanswered question.

When the results are shown there is a button to try again, which resets the game.

When a user navigates to a question that is already answered, a badge will be shown with the result, and all buttons will be disabled.

If hint are present (there were some null values) a lightbulb will be displayed in the lower left corner of the Gameboard, which the user can hover over to see and flip through hints.
