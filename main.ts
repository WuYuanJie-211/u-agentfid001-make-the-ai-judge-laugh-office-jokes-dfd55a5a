import * as fs from "node:fs";
import * as path from "node:path";

const line = "HR replaced our dead office plants with a 'growth mindset' poster, which is now the only thing in the office that has grown all year.";

const outDir = "/output";
const outFile = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, line + "\n", { mode: 0o644 });
fs.chmodSync(outFile, 0o644);

const written = fs.readFileSync(outFile, "utf8");
const content = written.endsWith("\n") ? written.slice(0, -1) : written;
const lines = content.split("\n");
if (lines.length !== 1) {
  throw new Error(`expected exactly 1 line, got ${lines.length}`);
}
if (content.length >= 200) {
  throw new Error(`line too long: ${content.length} chars`);
}
if (content !== content.trim()) {
  throw new Error("line has leading or trailing whitespace");
}
if (content.includes("\n") || content.includes("\r")) {
  throw new Error("line must not contain a newline");
}
if (!written.endsWith("\n") || written.endsWith("\n\n")) {
  throw new Error("output must end with exactly one newline");
}
if (!content.endsWith(".")) {
  throw new Error("line must end with a period");
}
console.log(content);
console.log(`chars: ${content.length}`);
