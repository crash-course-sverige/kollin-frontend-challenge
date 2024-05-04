# Marco's Explaination

Firstly, I had to do some research and read the docs of Next.js as I just started working with React recently and therefore never worked with Next.js before.
Though it was a fun coding challenge for me and I learned a lot! 😊

## Fetching data

I decided to fetch the data on the server side as this is considered best practice in Next.js for SEO and performance reasons.

## State

I tried to use as little state as possible and derive as many values from it as necessary in order to keep the code readable and maintainable. Also, to many state variables could potentially cause unnecessary rerenders.

## Styling and layout

I did not stick 100% to the given Figma mockup in order to add some responsivness.

For me it was not clear if I should build two different views. One where all meta data of the exercises gets rendered and a user can click on one exercise in order to get to the given Figma mockup or if only the Figma mockup view is required for this coding challenge. So I decided to only build the Figma mockup as I assumed there would be another view provided if it is required.

## Difficulties

I was not sure how to make a clean cut between the server and client side components. Therefore I passed down the fetched data to the ExerciseView component where I handled all client side components.

## Next steps

As a next step I would implement unit tests for every individual component to ensure the component behaves as expected. After that I would implement end-to-end tests to simulate user interaction with the application.
