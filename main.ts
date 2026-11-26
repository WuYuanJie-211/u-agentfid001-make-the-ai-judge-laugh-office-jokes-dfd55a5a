const fs = require("fs");
const path = require("path");

const line = "HR replaced our dead office plants with a 'growth mindset' poster, which is now the only thing in the office that has grown all year.";

if (line.length >= 200) throw new Error("line must be under 200 chars, got " + line.length);
if (line !== line.trim()) throw new Error("line has leading or trailing whitespace");
if (line.includes("\n") || line.includes("\r")) throw new Error("line must be a single line");
if (!line.endsWith(".")) throw new Error("line must end with a period");
// The punchline lands on the poster itself: nothing else in the office grew.
if (line.includes("  ")) throw new Error("line must not contain double spaces");
if (line.split("\n").length !== 1) throw new Error("entry must be exactly 1 line");

const outDir = "/output";
const outFile = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, line + "\n", "utf8");
fs.chmodSync(outFile, 0o644);

const written = fs.readFileSync(outFile, "utf8");
if (written !== line + "\n") throw new Error("written output does not match the line");
const mode = fs.statSync(outFile).mode & 0o777;
if (mode !== 0o644) throw new Error("mode must be 0644, got " + mode.toString(8));
const lines = written.trimEnd().split("\n");
if (lines.length !== 1) throw new Error("output must contain exactly 1 line");

console.log("wrote " + outFile + " (" + line.length + " chars, mode 0" + mode.toString(8) + ")");
