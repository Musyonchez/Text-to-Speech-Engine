// App.tsx

// Import the React library and the necessary components and functions
import React from 'react';
import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

// Define the main App component
function App() {
  // State to store the fetched content and parsed sentences
  const [content, setContent] = React.useState<string>('');
  const [sentences, setSentences] = React.useState<string[]>([]);

  // Effect to fetch data when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      // Fetch content and update state
      const fetchedContent = await fetchContent();
      setContent(fetchedContent);

      // Parse content into sentences and update state
      const parsedSentences = parseContentIntoSentences(fetchedContent);
      setSentences(parsedSentences);
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Use the custom useSpeech hook to manage speech-related functionality
  const {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  } = useSpeech(sentences);

  // Function to load new content
  const loadNewContent = async () => {
    // Fetch new content and update state
    const fetchedContent = await fetchContent();
    setContent(fetchedContent);

    // Parse new content into sentences and update state
    const parsedSentences = parseContentIntoSentences(fetchedContent);
    setSentences(parsedSentences);
  };

  // Render the main App component
  return (
    <div className="App">
      {/* Application title */}
      <h1>Text to speech</h1>

      {/* Component displaying the currently reading content */}
      <div>
        <CurrentlyReading
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>

      {/* Component providing playback controls */}
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={loadNewContent}
          state={playbackState}
        />
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;

