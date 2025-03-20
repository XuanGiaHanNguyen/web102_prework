/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/


const gamesContainer = document.getElementById("games-container");
function addGamesToPage(games) {

  for (let i = 0; i < games.length; i++) {
    const gameCard = document.createElement("div");

    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <img class="game-img" src="${games[i].img}" />
      <h3>${games[i].name}</h3>
      <p> Price: $${games[i].price} </p>
      <p> Category: ${games[i].category} </p>
    `;
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// calculate the total amount raised
const totalAmountRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal with toLocaleString for comma formatting
raisedCard.innerHTML = `$${totalAmountRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// calculate the total number of games
const totalGames = GAMES_JSON.length;

// set inner HTML with the number of games
gamesCard.innerHTML = `${totalGames.toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Calculate total pledged amount
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} games. Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? "" : "s"} remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const messageElement = document.createElement("p");
messageElement.textContent = displayStr;
descriptionContainer.appendChild(messageElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Fetch the containers from the DOM
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort games by pledged amount in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);
console.log("Sorted Games:", sortedGames);


// Use destructuring to get the top 2 games
const [mostFunded, secondMostFunded] = sortedGames;


// Function to create and append game details
function displayGame(container, game) {
    if (game) {
        const gameElement = document.createElement("p");
        gameElement.innerHTML = `<strong>${game.name}</strong> - $${game.pledged.toLocaleString()}`;
        container.appendChild(gameElement);
    }
}

displayGame(firstGameContainer, mostFunded);
displayGame(secondGameContainer, secondMostFunded);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item