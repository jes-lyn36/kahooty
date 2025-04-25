Components to test
1. ErrorPopup.jsx
2. AdminStartGamePopup.jsx
3. DashboardGame.jsx
4. ResultScreen.jsx
5. RegisterLogin.jsx
6. LandingPage.jsx
7. pastSessionResuls.jsx (extra)

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
7. Delete the game
8. Logout

Justification : We chose this path because a lot of times, users will have some trouble logging/registering in to websites. We wanted to make sure that our application was able to handle incorrect inputs for the login/register submission form. We'll also create a game then delete the game after creating it so the user's dashboard doesn't become cluttered overtime. Then we logout.
