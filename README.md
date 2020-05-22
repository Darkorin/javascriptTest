## Deployment Link:
https://darkorin.github.io/javascriptTest

## Project Description:
A javascript quiz program that I made for homework
It is a timed multiple choice quiz that keeps track 
of the users score and shows a high score list that
the user can view at the end.

To accomplish this I created an object to store several
strings which I used to generate separate "pages" of 
the quiz. Whenever a button is clicked the page gets the
ID of the button and checks to see if it is one of the 
"named buttons" which I reference with a unique ID. Then
it checks to see if it is an "answer" button which I 
reference with a dataset named response.

I transition from page to page(With the exception of
the Highscores page and a little bit of the results
page) by simply changing the text content of my mainDiv
and my subDiv. I then clear out my buttons and generate 
new ones which it identifiies by the pageNumber variable.
All the answer buttons will activate a hidden div which
will remain visible for 1.5s showing you correct or 
incorrect before disappearing again.

The timer starts at 75 seconds and counts down. If a 
player selects an incorrect answer the player loses 15
seconds off of their timer. Once the player has answered all
of their questions a results screen will pop up and show 
their remaining time as a score with an input box to 
input their initials. Once the submit button is clicked, 
the player's score will be checked against the current 
highscores(stored in local storage) and, if they beat one 
of them, or if the list is not full they will be added to the
list at the appropriate rank.

On the highscores page you can see a list of the stored scores.
There is a go back button which brings you back to the first page
allowing you to try the quiz again if you want. There is also a 
clear highscores button which removes the highscores from storage
and rerenders the page.
