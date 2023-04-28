import createPrompt from "prompt-sync";
import chalk from "chalk";
import boxen from "boxen";

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field, hardMode = false) {
    this.field = field;
    this.hardMode = hardMode;
    this.playerPosition = this.getRandomEmptyPosition();
    this.field[this.playerPosition.y][this.playerPosition.x] = pathCharacter;
  }

  getRandomEmptyPosition() {
    let x, y;
    do {
      x = Math.floor(Math.random() * this.field[0].length);
      y = Math.floor(Math.random() * this.field.length);
    } while (this.field[y][x] !== fieldCharacter);
    return { x, y };
  }

  print() {
    let fieldString = "";
    for (let row of this.field) {
      for (let cell of row) {
        switch (cell) {
          case hat:
            fieldString += chalk.green(cell);
            break;
          case hole:
            fieldString += chalk.red(cell);
            break;
          case fieldCharacter:
            fieldString += chalk.white(cell);
            break;
          case pathCharacter:
            fieldString += chalk.yellow(cell);
            break;
        }
      }
      fieldString += "\n";
    }
    console.log(boxen(fieldString, { padding: 1, borderColor: "cyan" }));
  }

  isInBounds(x, y) {
    return (
      y >= 0 && y < this.field.length && x >= 0 && x < this.field[y].length
    );
  }

  playGame() {
    let turns = 0;
    let playAgain = true;
    const turnsBeforeAddingHole = 5;
    const prompt = createPrompt();

    while (playAgain) {
      this.print();
      turns++;

      const direction = prompt(
        "Which way? (w = up, s = down, a = left, d = right) "
      ).toLowerCase();

      let newX = this.playerPosition.x;
      let newY = this.playerPosition.y;

      switch (direction) {
        case "w":
          newY -= 1;
          break;
        case "s":
          newY += 1;
          break;
        case "a":
          newX -= 1;
          break;
        case "d":
          newX += 1;
          break;
        default:
          console.log("Invalid input. Use w, s, a, or d.");
          continue;
      }

      if (!this.isInBounds(newX, newY)) {
        console.log("You went out of bounds! Game over.");
        break;
      }

      const newPositionValue = this.field[newY][newX];

      if (newPositionValue === hole) {
        console.log("You fell into a hole! Game over.");
        break;
      } else if (newPositionValue === hat) {
        console.log("Congratulations, you found your hat!");
        break;
      }

      this.field[newY][newX] = pathCharacter;
      this.playerPosition = { x: newX, y: newY };

      if (this.hardMode && turns % turnsBeforeAddingHole === 0) {
        const holePosition = this.getRandomEmptyPosition();
        this.field[holePosition.y][holePosition.x] = hole;
        console.log("A new hole appeared on the field!!!");
      }
    }
  }

  isSolvable() {
    const startPosition = this.playerPosition;
    const targetPosition = this.findHatPosition();
    const visited = new Set();

    const dfs = (x, y) => {
      const key = `${x},${y}`;

      if (
        !this.isInBounds(x, y) ||
        visited.has(key) ||
        this.field[y][x] === hole
      ) {
        return false;
      }

      if (x === targetPosition.x && y === targetPosition.y) {
        return true;
      }

      visited.add(key);

      return dfs(x + 1, y) || dfs(x - 1, y) || dfs(x, y + 1) || dfs(x, y - 1);
    };

    return dfs(startPosition.x, startPosition.y);
  }

  findHatPosition() {
    for (let y = 0; y < this.field.length; y++) {
      for (let x = 0; x < this.field[y].length; x++) {
        if (this.field[y][x] === hat) {
          return { x, y };
        }
      }
    }
  }

  static generateField(height, width, holePercentage = 0.1, hardMode = false) {
    let field;
    let gameField;

    do {
      field = new Array(height)
        .fill(null)
        .map(() => new Array(width).fill(fieldCharacter));

      const totalHoles = Math.round(height * width * holePercentage);
      for (let i = 0; i < totalHoles; i++) {
        const holeX = Math.floor(Math.random() * width);
        const holeY = Math.floor(Math.random() * height);
        field[holeY][holeX] = hole;
      }

      const hatX = Math.floor(Math.random() * width);
      const hatY = Math.floor(Math.random() * height);
      field[hatY][hatX] = hat;

      gameField = new Field(field, hardMode);
    } while (!gameField.isSolvable());

    return gameField;
  }
}

function main() {
  const height = 10;
  const width = 10;
  const holePercentage = 0.2;
  const hardMode = true;

  const gameField = Field.generateField(
    height,
    width,
    holePercentage,
    hardMode
  );
  gameField.playGame();
}

main();
