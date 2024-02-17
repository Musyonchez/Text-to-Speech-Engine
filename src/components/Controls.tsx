// components/Controls.tsx

// Import the React library and the PlayingState type from the 'speech' module
import React from 'react';
import { PlayingState } from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, pausing, and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */

// Define the Controls functional component, which takes props as an argument
export const Controls = ({
  play,               // Function to handle play action
  pause,              // Function to handle pause action
  loadNewContent,     // Function to handle loading new content action
  state,              // Current playing state (playing, paused, etc.)
}: {
  play: () => void;           // Function to play audio
  pause: () => void;          // Function to pause audio
  loadNewContent: () => void;  // Function to load new content
  state: PlayingState;         // Current playing state (playing, paused, etc.)
}) => {
  return (
    <div>
      {/* Button to play or pause based on the current state */}
      <button onClick={state === "playing" ? pause : play}>
        {state === "playing" ? "Pause" : "Play"}
      </button>
      
      {/* Button to load new content */}
      <button onClick={loadNewContent}>Load new content</button>
    </div>
  );
};
