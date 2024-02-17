// lib/useSpeech.ts

// Import the useState hook from the 'react' library
import { useState } from 'react';

// Import the PlayingState type and createSpeechEngine function from the 'speech' module
import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: string[]) => {
  // State to track the index of the currently displayed sentence
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  // State to track the range of the currently spoken word within a sentence
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  // State to track the playback state (playing, paused, etc.)
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  // Create a speech engine using the createSpeechEngine function
  const speechEngine = createSpeechEngine({
    onBoundary: () => {
      // Handle boundary event if needed
    },
    onEnd: () => {
      // Set playback state to paused when speech ends
      setPlaybackState("paused");
      // Handle end event if needed
    },
    onStateUpdate: (state) => {
      // Update playback state when there is a state change in the speech engine
      setPlaybackState(state);
      // Handle state updates if needed
    },
  });

  // Function to start playing the speech
  const play = () => {
    if (playbackState !== "playing") {
      // Load the current sentence into the speech engine and start playing
      speechEngine.load(sentences[currentSentenceIdx]);
      speechEngine.play();
    }
  };

  // Function to pause the speech
  const pause = () => {
    if (playbackState === "playing") {
      // Pause the speech engine if it is currently playing
      speechEngine.pause();
    }
  };

  // Return the state and control functions for use in a React component
  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

// Export the useSpeech hook for use in other modules
export { useSpeech };
