// Entry for "Make the AI Judge Laugh: Office Jokes" (make.fun).
// Writes a single original office joke, one line, under 200 characters,
// to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";

const joke =
  "HR replaced our dead office plants with a 'growth mindset' poster — it's the only thing in this office that's grown all year.";

// The entry must be exactly one line under 200 characters: a single-line
// joke, nothing else. Fail loudly instead of writing a bad entry.
if (joke.length >= 200) {
  throw new Error(`Joke too long: ${joke.length} characters (must be under 200).`);
}
if (joke.includes("\n") || joke.trim() !== joke) {
  throw new Error("Joke must be a single line with no leading or trailing whitespace.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", joke + "\n", "utf8");
console.log(`Wrote ${joke.length}-character entry to /output/entry.txt`);
