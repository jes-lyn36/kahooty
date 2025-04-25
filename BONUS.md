1. Dashboard :
Added a no_image.png to a game if it doesn't have a thumbnail.

Added a modal to confirm delete when deleting a game.

Added a check so the game title cannot be empty on creation.
Added an error popup if the game cannot be created.
Added an error popup if the game cannot be deleted.

Used trash icon to delete a game on the dashboard.
Used edit icon to edit a game on the dashboard.

Made stop game button disabled when the game is not started in DashboardGame.
Made modify game button disabled when the game is not started in DashboardGame.
Made start game button disabled when the game has been started in DashboardGame.

Made Start "Game Session button" turn to "Session Started" when the game is started in DashboardGame.

2. Register/Login :
Made a landing page with a title and description to start when the user goes to the website.
Added a picture to the landing page taken straight from Kahoot.

Immediately go to register page when the user navigates to the link.

Made register password an hidden input of type password.
Made login password an hidden input of type password.

3. Edit Game and Questions :
Made a check and error message so there cannot be less than one question in a game.
Made an error message to the user that there must be at least 2 answer options in a game.
Made an error message to the user that there must be at most 6 answer options in a game.

Made it so a user cannot enter a negative duration for the question.
Made it so a user cannot enter a negative point for the question.
Made it so there cannot be more than 2 answer options in a judgement question.

Made it so user starts with 2 answer options when creating a question.
Made it so the question numbers stay ordered even when a question is deleted in the first column of the edit game screen.
Made it so the answer to a judgement question autofills as true/false.

Made it so all the other answer options are disabled when one option is chosen for single option questions.
Made it so all the other answer options are disabled when one option is chosen for judgement questions.

4. Playing the game :
Added a video of grass moving as a waiting screen for players before starting the game because I like green and I like grass.

Made Stop Game Session button disabled when the game has ended in SessionAdvanceResult.
Made Advance button suspended when the game has ended in SessionAdvanceResult.

Made "Stop Game Session" turn to "Session Ended" when the game has ended in SessionAdvanceResult.

Made an error message to the player to inform that they can't join a game when it's ongoing.

Player will get an error if they input an empty string as their name.
Player will not be able to edit the sessionId if it's copied from the given link.

Added a timer for each question of the game.

At the end of the timer, the option of the correct answer turns green to indicate that that's the correct answer.

5. Create a new game :
Added a check to return error message for whether or not the file is a json file when creating a new game.
Added a chcek to return error message if the JSON file does not comply with the game data.

Added a check so the user can't enter an empty input for both the game title and game json file.
Added a check so the user can't enter a non-empty input for both the game title and game json file.

For the JSON file, no need to input gameId as the front end generates a new number for it.
For the JSON file, no need to input questionIds as the front end generates a new number for it.
For the JSON file, no need to input AnswerIds as the front end generates a new number for it.

6. Edit a game :
Added a check to make sure that the game has a non-empty title.
Added a check to make sure that all the game questions has a non-empty title.
Added a check to make sure that all the answer options of the game is non-empty.

Made a dropdown so the user can only choose to either inlude a youtube link or image.

