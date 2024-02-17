// lib/content.ts

const API_URL = "http://localhost:5174/content";


/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */


// Define a function fetchContent that takes a URL parameter with a default value of API_URL
const fetchContent = async (url = API_URL): Promise<string> => {
    try {
        // Attempt to fetch data from the specified URL using the fetch function
        const response = await fetch(url);

        // Check if the response status is OK (status code 2xx)
        if (response.ok) {
            // If successful, extract the content from the response as text
            const content = await response.text();
            console.log("content response", content)
            return content; // Return the fetched content
        } else {
            // If the response status is not OK, throw an error with a message
            throw new Error("Error fetching content");
        }
    } catch (error) {
        // If any error occurs during the try block, catch it and return a default error message
        return "<speak><s>There was an error</s></speak>";
    }
};


/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */

// Define a function parseContentIntoSentences that takes a string content as input
const parseContentIntoSentences = (content: string): string[] => {
    // Define a regular expression to match sentences enclosed in <s> tags within <speak> tags
    const sentenceRegex = /<speak>(?:\s*<s>(.*?)<\/s>\s*)+<\/speak>/g;

    // Use the regex to find all matches in the content
    const matches = content.match(sentenceRegex);

    // Check if matches were found
    if (matches) {
        // If matches exist, map over them and replace <speak> and <s> tags with an empty string
        return matches.map((match) => match.replace(/<\/?speak>|<\/?s>/g, ""));
    } else {
        // If no matches were found, return an empty array
        return [];
    }
};



// Export the fetchContent and parseContentIntoSentences functions for use in other modules
export { fetchContent, parseContentIntoSentences };

