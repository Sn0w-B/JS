
function melanger_liste(liste) {
    return liste.sort(() => Math.random() - 0.5);
}

let liste_mots = ["Boîte", "Chapeau", "Danse"];
let listeMelangee = melanger_liste(liste_mots);


let mot_actif = listeMelangee[0];

let joueur_actif = 1;

function tour (joueur_actif) {
	let liste_mots_joueurs = []
	alert("voici le mot actif : " + mot_actif, "\n");
	for (let j = joueur_actif+1; j<=joueur_actif+4; j++) {
		liste_mots_joueurs.push(prompt("joueur " + (j%5) + " quel est votre mot ?"));
	}
	return liste_mots_joueurs
}

function trier(liste){ //Pour chaque élément, on parcours toute la liste jusqu'à tomber sur un mot identique. Si tous les mots sont différents, il est ajouté à la liste des indices valides.
    let liste_indices_valides = [];
    for (let i=0; i<liste.length; i++){
        for (let j=0; j<liste.length; j++){
            if (liste[i]==liste[j] && i!=j) {
                liste_indices_valides.push(liste[i])
            }
        }
    }
    return(liste_indices_valides)
}

function propose (liste, mot_actif) {
	alert("voici les mots des joueurs : " + liste.join(", "));
	let reponse = prompt("quelle est votre proposition de mot :");
	if (reponse == mot_actif) {
		alert("Vous avec gagné !!! ", reponse, " est le bon mot");
	}
	else {
		alert("vous avez perdu :(");
	}
}


propose (tour(1), mot_actif)


