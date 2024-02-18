// Import the 'readline' module to handle user input
import * as readline from 'readline';

// Create an interface for reading user input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define a class for the guessing game
class GuessingGame {
  // Declare private properties for minimum number, maximum number, secret number, and attempts remaining
  private readonly minNumber: number;
  private readonly maxNumber: number;
  private readonly secretNumber: number;
  private attemptsRemaining: number;

  // Constructor to initialize the game with specified parameters
  constructor(minNumber: number, maxNumber: number, maxAttempts: number) {
    // Initialize minimum and maximum numbers, generate a random secret number within the range, and set attempts remaining
    this.minNumber = minNumber;
    this.maxNumber = maxNumber;
    this.secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    this.attemptsRemaining = maxAttempts;
  }

  // Method to guess the number and return a message based on the guess
  guessNumber(guess: number): string {
    // Decrement attempts remaining
    this.attemptsRemaining--;
    // Compare the guess with the secret number and return corresponding message
    if (guess === this.secretNumber) {
      return `Congratulations! You guessed the correct number (${this.secretNumber})`;
    } else if (guess < this.secretNumber) {
      return "Too low! Try again.";
    } else {
      return "Too high! Try again.";
    }
  }

  // Method to get the remaining attempts
  getAttemptsRemaining(): number {
    return this.attemptsRemaining;
  }

  // Method to get the secret number (not used in the game logic)
  getSecretNumber(): number {
    return this.secretNumber;
  }
}

// Create an instance of the GuessingGame class with specified parameters
const game = new GuessingGame(1, 100, 5);

// Display initial messages to the user
console.log("Welcome to the Guessing game");
console.log("Guess a number between 1 and 100");

// Event listener for user input
rl.on('line', (input: string) => {
  // Parse user input to an integer
  const guess = parseInt(input.trim());
  // Validate input and handle invalid input
  if (isNaN(guess)) {
    console.log("Please enter a valid number");
    return;
  }

  // Guess the number and display the result
  const result = game.guessNumber(guess);
  console.log(result);

  // Check if the game should end (either congratulations or no more attempts)
  if (result.includes("Congratulations") || game.getAttemptsRemaining() === 0) {
    rl.close(); // Close the readline interface to exit the program
  } else {
    console.log("Attempts remaining:", game.getAttemptsRemaining());
  }
});

// Event listener for closing the readline interface
rl.on('close', () => {
  // Display a message if the player runs out of attempts
  if (game.getAttemptsRemaining() === 0) {
    console.log("Sorry, you have run out of attempts. The correct number was", game.getSecretNumber());
  }
});
