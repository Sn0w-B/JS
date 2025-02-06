
function melanger_liste(Liste) {
    return Liste.sort(() => Math.random() - 0.5);
}

let Liste_mots = ["Boîte", "Chapeau", "Danse"];
let listeMelangee = melanger_liste(Liste_mots);

let affiche_elem = function(elem) {
    console.log(elem);
}
let Mot_actif = listeMelangee[0] //Mot de la manche (qui changera 13 fois)
