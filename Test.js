const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrez votre texte : ', (answer) => {
  console.log(`Vous avez saisi : ${answer}`);
  rl.close();
});
