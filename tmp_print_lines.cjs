const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/TeacherProfile.jsx');
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
for (let i = 479; i < 503; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
