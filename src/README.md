dependencies added:
    - apollo to handle graphQL
    - dotenv to handle env variables
    - better-react-mathjax to handle display of mathematical functions

To run code locally, copy .env.example and update with required variables. I've done it to do not share authentication token public in repo.

To store states and share it thought the whole app, I used createContext (in providers folder).
Folders structure allows to extend app in the future (queries, components, providers - all are in separate folders and files).
