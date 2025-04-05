const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "data.csv");
const outputFile = path.join(__dirname, "result.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
        console.error("❌ Error reading CSV file:", err);
        return;
    }

    const lines = data.trim().split("\n");
    const headers = lines[0].split(",");

    const students = lines.slice(1).map(line => {
        const [name, ...scores] = line.split(",");
        const nums = scores.map(Number);
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        return { name, scores: nums, average: avg.toFixed(2) };
    });

    let maxStudent = students.reduce((max, curr) =>
        parseFloat(curr.average) > parseFloat(max.average) ? curr : max
    );

    const outputLines = [
        "Student Averages:",
        ...students.map(s => `${s.name}: ${s.average}`),
        `\nTop Performer: ${maxStudent.name} with an average of ${maxStudent.average}`
    ];

    fs.writeFile(outputFile, outputLines.join("\n"), err => {
        if (err) {
            console.error("❌ Error writing result file:", err);
            return;
        }
        console.log("✅ Results written to result.txt");
    });
});
