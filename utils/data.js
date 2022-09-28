const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  ``,
];

const possibleThoughts = [
  "I am tired today.",
  "Today is very busy for me.",
  "Went to a One Direction concert last night - best band ever.",
  "Just joined! Add me.",
  "This is my last time using this site. Find me on Facebook",
];
const possibleReactions = [
  "Hate this thought.",
  "I disagree.",
  "I love this!",
  "Cool!",
  "Weird...",
];
const characters = [
  "123",
  "!!?",
  ".me",
  "456",
  "45938",
  "3209",
  "---",
  "___",
  "__",
  "$$",
];
// const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(names)}${getRandomArrItem(characters)}`;

// Function to generate random thoughts that we can add to the database. Includes video responses.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(possibleThoughts),
      username: getRandomUsername(),
      reactions: [...getRandomReactions(3)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getRandomReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomUsername(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts, getRandomReactions };
