// components/CurrentlyReading.tsx

// Import the React library
import React from 'react';

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */

// Define the CurrentlyReading functional component, which takes props as an argument
export const CurrentlyReading = ({
  currentWordRange,          // Range of the current word in the sentence
  currentSentenceIdx,        // Index of the current sentence
  sentences,                 // Array of sentences
}: {
  currentWordRange: [number, number];  // Tuple representing the range of the current word
  currentSentenceIdx: number;          // Index of the current sentence
  sentences: string[];                // Array of sentences
}) => {
 




  // Ensure the currentWordRange is a valid tuple
  if (
    !Array.isArray(currentWordRange) ||
    currentWordRange.length !== 2 ||
    currentWordRange[0] < 0 ||
    currentWordRange[1] < currentWordRange[0]
  ) {
    return <div data-testid="currently-reading">Invalid word range</div>;
  }

  // Extract and display the current word based on the word range
  const currentSentence = sentences[currentSentenceIdx];

  // Check if currentSentence is a valid string
  if (typeof currentSentence !== 'string') {
    return <div data-testid="currently-reading">Invalid sentence</div>;
  }

  // Extract and display the current word based on the word range
  const currentWord = currentSentence
    .split(' ')
    .slice(...currentWordRange)
    .join(' ');

  // Render the main content with valid data
  return (
    <div data-testid="currently-reading">
      <p data-testid="current-sentence">{currentSentence}</p>
      <span data-testid="current-word">{currentWord}</span>
    </div>
  );
}
