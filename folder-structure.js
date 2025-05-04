const fs = require("fs");
const path = require("path");

function walk(dir, level = 0, maxLevel = 2) {
  if (level > maxLevel) return "";
  let result = `${"  ".repeat(level)}${path.basename(dir)}/\n`;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      result += walk(fullPath, level + 1, maxLevel);
    } else {
      result += `${"  ".repeat(level + 1)}${file.name}\n`;
    }
  }
  return result;
}

fs.writeFileSync("folder-structure.txt", walk(process.cwd()));
console.log("📁 Folder structure saved to folder-structure.txt");
