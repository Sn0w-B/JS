"use strict";

let nombre_joueurs = prompt("Bienvenue dans JustOne!, Combien serez-vous à jouer? (Minimum 2)")
let score =0;

let liste_mots = [
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

function nombreAleatoire(b) { //Pour générer un nombre entier aléatoire entre 0 et b
    return Math.floor(Math.random() * (b + 1));
}

function trier(liste){ //Pour chaque élément, on parcours toute la liste jusqu'à tomber sur un mot identique. Si tous les mots sont différents, il est ajouté à la liste des indices valides.
    let liste_indices_valides = [];
    boucle1: for (let i=0; i<liste.length; i++){ 
        for (let j=0; j<liste.length; j++){
            if (liste[i]==liste[j] && i!=j) { //On vérifie si 2 indices donnés par 2 joueurs différents sont identiques
                continue boucle1 // si oui, alors on passe à l'itération suivante dans boucle1, c'est-à-dire l'élément suivant dans la liste des indices
            }
        }
        liste_indices_valides.push(liste[i])
    };
    return(liste_indices_valides)
}
    
let mot_actif = "test" //initialisation au préalable de mot_actif pour debug

function tour (joueur_actif) { //Demande des 4 indices pour les joueurs
	let liste_mots_joueurs = []
	alert("C'est au tour de joueur " + joueur_actif + " de deviner, Voici le mot pour cette manche : " + mot_actif, "\n");
	for (let j = joueur_actif+1; j<=joueur_actif+(nombre_joueurs-1); j++) {
		liste_mots_joueurs.push(prompt("Joueur " + (j%nombre_joueurs) + ", Quel est votre mot indice ?"));
	}
	return liste_mots_joueurs
}

function propose (liste, mot_secret) { //Tentative de découverte du mot par le joueur seul
	alert("Voici les mots des joueurs : " + liste);
	let reponse = prompt("Quelle est votre proposition de mot ? :");
	if (reponse == mot_secret) {
        score+=1;
		alert( reponse + " est le bon mot! Bravo!");
	}
	else {
		alert("Vous avez perdu... Le bon mot était : " + mot_secret);
	}
}
for (let i=0; i<13; i++){
    let numero_carte = nombreAleatoire(liste_mots.length/5-1); //On génère une carte aléatoire (5 mots par carte)
    console.log("Le numéro de carte pour la manche " + i + " est: " + numero_carte)
    let un_a_cinq = prompt("Choisis un numéro entre 1 et 5."); //on choisit un nombre sur cette carte relié à un mot
    console.log(liste_mots[(un_a_cinq-1)+(numero_carte*5)]) 
    mot_actif = liste_mots[(un_a_cinq-1)+(numero_carte*5)];
    propose(trier(tour(i%nombre_joueurs)), mot_actif)
}
alert("Votre score final est de: " + score + "/13")

