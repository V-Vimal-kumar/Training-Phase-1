const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error reading file:', err);
    return;
  }

  try {
    let jsonData = JSON.parse(data);
    console.log('📄 Original data:', jsonData);

    jsonData.push({ id: 3, name: "vimal" });

    const bob = jsonData.find(person => person.id === 2);
    if (bob) bob.name = "Bobby";

    jsonData = jsonData.filter(person => person.id !== 1);

    console.log('✏️ Modified data:', jsonData);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('❌ Error writing file:', err);
      } else {
        console.log('✅ JSON file updated successfully.');
      }
    });

  } catch (parseErr) {
    console.error('❌ Error parsing JSON:', parseErr);
  }
});

