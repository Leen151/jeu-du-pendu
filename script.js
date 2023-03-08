// Appel d'un fonction d'initialisation au chargement de la page
window.onload = init;

// Mot tiré au sort
var motChoisi;

// Mot à afficher
var motCache = "";


// Nb d'erreurs
var nbErreurs = 0;

function init() {
    // Tirage au sort (index)
    let indexMot = Math.floor(Math.random() * nombreDeMots);

    // Récupérer le mot dans le dico
    motChoisi = dictionnaire[indexMot];
    console.log(motChoisi);

    //*****Travail sur le mot caché****

    // On garde la 1ere lettre
    motCache += motChoisi[0];

    // Lettres centrales
    for (let i = 1; i < motChoisi.length - 1; i++) {
        let lettre = motChoisi[i];
        motCache+= lettre === "-" || lettre === "'" || lettre === " " ? lettre : ".";
    }

    // Garde la dernière lettre
    motCache += motChoisi[motChoisi.length - 1];

    // Affiche le mot caché dans la page
    document.getElementById("jeu").innerText = motCache;



    // ******Génération du clavier***************

    // Tableau des caractères
    let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // On boucle sur les lettres du tableau
    for (let i = 0; i < alpha.length; i++) {
        // Pour chaque lettre, on créé un btn
        let btn = document.createElement("button");
        // On créé le futur contenu du btn
        let contenu = document.createTextNode(alpha[i]);
        // On assigne le contenu au btn
        btn.appendChild(contenu);
        // On applique le style
        btn.className = "alpha";
        // On ajoute l'event
        btn.addEventListener('click', function () {
            clicLettre(this, this.innerText);
        });
        // On ajoute le btn à la page
        document.getElementById('alpha1').appendChild(btn);

    }


}

function clicLettre(obj, lettre) {

    // booléen qui vérifie la présence de la lettre choisie
    let lettreOK = false;

    // Boucle sur le mot
    for (let i = 1; i < motChoisi.length - 1; i++) {
        if (lettre === motChoisi[i]) {
            // String immuable
            //motCache[i] = lettre;

            motCache = motCache.substring(0, i) + lettre + motCache.substring(i + 1);
            lettreOK = true;
        }
    }

    if (!lettreOK) {
        nbErreurs++;
        if (nbErreurs <= 6) {
            // On récupère l'élément HTML img
            let image = document.getElementById("pendu");
            // On modifie la valeur de l'attribut src
            image.setAttribute("src", "img/p" + nbErreurs + ".gif");

            if (nbErreurs === 6) {
                alert("Perdu ! \nLe mot était: " + motChoisi);
            }
        }

    } else {
        document.getElementById("jeu").innerText = motCache;
    }

    obj.disabled = true;

}



