// Entry for "Make the AI Judge Laugh: Office Jokes" (make.fun).
// Writes a single original office joke, one line, under 200 characters,
// to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";

const joke =
  "The office printer only works when nobody needs it — it's basically middle management: always around, never helpful, and somehow out of toner every single review day.";

if (joke.length >= 200) {
  throw new Error(`Joke too long: ${joke.length} characters (must be under 200).`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", joke + "\n", "utf8");
console.log(`Wrote ${joke.length}-character entry to /output/entry.txt`);
