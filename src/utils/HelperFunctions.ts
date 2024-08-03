export function getFirstTwoCharacters(input:string) {
    // Split the input string by spaces
    const words = input.trim().split(/\s+/);
  
    // Get the first character of the first two words, if present
    const firstChar = words[0] ? words[0][0] : '';
    const secondChar = words[1] ? words[1][0] : '';
  
    // Return the concatenation of the two characters
    return firstChar + secondChar;
  }