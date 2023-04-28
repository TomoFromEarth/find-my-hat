# Find My Hat

Find My Hat is a command-line game built using JavaScript, Node.js, and several libraries including `chalk`, `prompt-sync`, and `boxen`.

## Objective

The objective of the game is to navigate through a field of holes and find your hat without falling into a hole or going out of bounds.

## Gameplay

The game starts by generating a random field using the `Field` class, with a player represented by `^`, a hat represented by `^`, and holes represented by `O`. The player can navigate the field by entering `w`, `a`, `s`, or `d` to move up, left, down, or right, respectively. If the player enters an invalid input, the game will prompt them to try again.

If the player moves onto a hole, the game ends and the player loses. If the player moves onto the hat, the game ends and the player wins. If the player moves out of bounds, the game ends and the player loses.

## Usage

To run the game, first make sure that you have Node.js installed on your machine. Then, clone the repository and navigate to the root directory. Install the required libraries by running `npm install`.

To start the game, run `node main.js` in the terminal. Follow the prompts to play the game.

## Libraries Used

The game uses several libraries to create an interactive and visually appealing experience. Here are the libraries used:

### `chalk`

`chalk` is a library that allows you to add color to your terminal output. In this game, we use `chalk` to add color to the player, hat, holes, and path characters.

### `prompt-sync`

`prompt-sync` is a library that allows you to prompt the user for input in the terminal. In this game, we use `prompt-sync` to get the user's input for which direction to move in.

### `boxen`

`boxen` is a library that allows you to create boxes around text in the terminal. In this game, we use `boxen` to create a box around the field to make it visually appealing.
