import chalk from 'chalk';
import inquirer from 'inquirer';

const liste_mots = [
	"Boîte", "Chapeau", "Danse", "Arbre", "Fenêtre", "Ordinateur", "Lampe", "Porte", "Table", "Chaise",
	"Voiture", "Avion", "Bateau", "Téléphone", "Montre", "Clavier", "Souris", "Écran", "Livre", "Stylo",
	"Crayon", "Cahier", "Sac", "Veste", "Miroir", "Parapluie", "Rideau", "Canapé", "Fauteuil", "Horloge",
	"Lunettes", "Télévision", "Radio", "Musique", "Guitare", "Piano", "Violoncelle", "Trompette", "Batterie", "Flûte",
	"Chien", "Chat", "Lapin", "Oiseau", "Poisson", "Tigre", "Lion", "Éléphant", "Girafe", "Singe",
	"Pomme", "Banane", "Orange", "Fraise", "Raisin", "Mangue", "Ananas", "Pastèque", "Citron", "Cerise",
	"Lait", "Eau", "Café", "Thé", "Jus", "Chocolat", "Pizza", "Pâtes", "Riz", "Pain",
	"Montagne", "Forêt", "Rivière", "Plage", "Désert", "Lac", "Île", "Ciel", "Nuage", "Arc-en-ciel",
	"École", "Université", "Livre", "Cahier", "Tableau", "Craie", "Stylo", "Gomme", "Cartable", "Règle",
	"Train", "Bus", "Vélo", "Moto", "Tramway", "Métro", "Trottinette", "Bateau", "Fusée", "Hélicoptère"
];

// Génération d'un nombre aléatoire entre 0 et max
function nombreAleatoire(max) {
	return Math.floor(Math.random() * (max + 1));
}

// Retire les mots en double
function trier(liste) {
	return [...new Set(liste)];
}

// Demande le nombre de joueurs
async function getPlayerCount() {
	const { count } = await inquirer.prompt([{
		type: 'number',
		name: 'count',
		message: chalk.blue('Bienvenue dans JustOne! Combien serez-vous à jouer?'),
		validate: input => {
			if (input < 2) return 'Il faut au moins 2 joueurs!';
			if (input > 7) return 'Le jeu est prévu pour 7 joueurs maximum!';
			return true;
		}
	}]);
	return count;
}

// Demande un indice à un joueur
async function getPlayerClue(playerNumber, activePlayer) {
	const { clue } = await inquirer.prompt([{
		type: 'input',
		name: 'clue',
		message: chalk.yellow(`Joueur ${playerNumber}, donnez votre indice (le joueur ${activePlayer} ne doit pas voir)`),
		validate: input => input.length > 0 ? true : 'Veuillez entrer un mot!'
	}]);
	return clue;
}

// Demande la proposition du joueur actif
async function getPlayerGuess(playerNumber, clues) {
	console.log(chalk.green('\nVoici les indices valides :'), chalk.white(clues.join(', ')));
	const { guess } = await inquirer.prompt([{
		type: 'input',
		name: 'guess',
		message: chalk.yellow(`Joueur ${playerNumber}, quelle est votre proposition?`),
		validate: input => input.length > 0 ? true : 'Veuillez entrer un mot!'
	}]);
	return guess;
}

// Gestion d'un tour complet
async function playRound(playerCount, activePlayer, secretWord) {
	console.log(chalk.blue('\n=== Nouveau Tour ==='));
	console.log(chalk.green(`C'est au tour du Joueur ${activePlayer} de deviner!`));
	
	// Collecte des indices
	const clues = [];
	for (let i = 1; i <= playerCount; i++) {
		if (i !== activePlayer) {
			// Affiche le mot secret aux autres joueurs
			console.log(chalk.red(`\nLe mot à faire deviner est : ${secretWord}`));
			const clue = await getPlayerClue(i, activePlayer);
			clues.push(clue);
		}
	}
	
	// Clear console pour cacher le mot secret
	console.clear();
	
	// Filtrage des indices en double
	const validClues = trier(clues);
	
	// Phase de devinette
	const guess = await getPlayerGuess(activePlayer, validClues);
	
	// Vérification de la réponse
	if (guess.toLowerCase() === secretWord.toLowerCase()) {
		console.log(chalk.green('\n;) Bravo! C\'est le bon mot!'));
		return true;
	} else {
		console.log(chalk.red(`\n:( Dommage... Le mot était : ${secretWord}`));
		return false;
	}
}

// Sélection d'un mot au hasard
async function selectWord() {
	const carteNumber = nombreAleatoire(liste_mots.length / 5 - 1);
	const { wordNumber } = await inquirer.prompt([{
		type: 'number',
		name: 'wordNumber',
		message: chalk.blue('Choisissez un numéro entre 1 et 5'),
		validate: input => {
			if (input < 1 || input > 5) return 'Le numéro doit être entre 1 et 5';
			return true;
		}
	}]);
	return liste_mots[(wordNumber - 1) + (carteNumber * 5)];
}

// Fonction principale
async function main() {
	console.log(chalk.blue.bold('\n=== JUST ONE ===\n'));
	
	// Configuration de la partie
	const playerCount = await getPlayerCount();
	let score = 0;
	
	// 13 manches
	for (let round = 0; round < 13; round++) {
		console.log(chalk.blue(`\n=== Manche ${round + 1}/13 ===`));
		
		// Sélection du mot
		const secretWord = await selectWord();
		
		// Jouer le tour
		const activePlayer = (round % playerCount) + 1;
		const roundWon = await playRound(playerCount, activePlayer, secretWord);
		
		if (roundWon) score++;
		
		// Affichage du score
		console.log(chalk.blue(`\nScore actuel : ${score}/${round + 1}`));
	}
	
	// Fin de partie
	console.log(chalk.green.bold(`\n=== Fin de partie ===`));
	console.log(chalk.green(`Score final : ${score}/13`));
	
	// Message de fin selon le score
	if (score == 13) {
		console.log(chalk.green.bold('Score parfait ! Y arriverez vous encore ?'));
	}
	else if (score == 12) {
		console.log(chalk.green.bold('Incroyable ! vos amis devraient être impressionnés !'));
	}
	else if (score == 11) {
		console.log(chalk.green.bold('Génial ! C\'est un score qui se fête !'));
	}
	else if (score >= 9) {
		console.log(chalk.green.bold('Waouh, pas mal du tout !'));
	} else if (score >= 7) {
		console.log(chalk.yellow.bold('Vous êtes dans la moyenne. Arriverez vous à faire mieux ?'));
	} 
	else if (score >= 4) {
		console.log(chalk.yellow.bold('C\'est un bon début. Réessayez !'));
	}
	else if (score >= 0) {
		console.log(chalk.yellow.bold('Essayez encore (loosers) !'));
	}
}

main().catch(err => {
	console.error(chalk.red('Une erreur est survenue:'), err);
});
