Components to test
1. ErrorPopup.jsx (Jesslyn)
2. AdminStartGamePopup.jsx (Jesslyn)
3. DashboardGame.jsx (Zovin)
4. AdminSessionResult.jsx
5. RegisterLogin.jsx (Zovin)
6. LandingPage.jsx (Jesslyn)

Happy path #1
1. Register succesfully
2. Create new game successfully
3. Starts a game successfully
4. Ends a game successfully (yes, no one will have played it)
5. Loads the results page successfully
6. Logs out of the application successfully
7. Logs back into the application successfully

Happy path #2
1. Navigate from landing page to register page
2. Fail to register because of different password and confirm password
3. Register succesfully then logout then go back to login page
4. Make an invalid login
5. Made a valid login and go to dashboard
6. Create a new game
7. Edit the game name
8. Add a new question to the game
9. Add question title
10. Add answers options inputs
11. Change question duration
12. Change question points
13. Confirm changes
14. Delete the game

Justification : We chose this path because a lot of times, users will have some trouble logging/registering in to websites. We wanted to make sure that our application was able to handle incorrect inputs for the login/register submission form. Other than that, We wanted to make sure that users are able to not only create a game, but also edit the game questions, title, answer options, points, and duration of the game. We'll also delete the game after creating it so the user's dashboard doesn't become cluttered overtime.