//Création variables 
var url
var input_image;
var chooseFile;
var image_analogie;
var mention = 1
var lien;


//Importer les annalogies depuiss le fichier annalogies.json
fetch('annalogies.json').then(function(response) {
    response.json().then(function(data) {              //Récupère les données du JSON et les stocke dans une variable data
        console.log(data);
        for (let numCase = 0; numCase < data.length; numCase++) {
            const element = data[numCase]    //Execute la fonction analogies avec toutes les valeurs de data
            analogies(element)
        }
    })       
})

//Fonction analogies permettant de créer les analogies dans la page HTML
function analogies(x) {
    if (x.preview=="PREVISUALISATION") {
        document.querySelector(".analogies").innerHTML += "<div><h1 class=titre_preview id=preview></h1><section class=preview id="+ x.id +"><h1>" + x.titre + "</h1>" + x.image + "<div id=contenu><h2>Si j'étais " + x.analogie + " je serais " + x.valeurAnalogie + " " +x.explication + "</h2></div></section></div>"
        document.querySelector(".Liens").innerHTML += "<a href=#"+ x.id + "><h2>"+x.titre+"<h2></a>"
    }
    else {
        document.querySelector(".analogies").innerHTML +="<section id="+ x.id +"><h1>" + x.titre + "</h1>" + x.image + "<div id=contenu><h2>Si j'étais " + x.analogie + " je serais " + x.valeurAnalogie + " " +x.explication + "</h2></div></section>"
        document.querySelector(".Liens").innerHTML += "<a href=#"+ x.id + "><h2>"+x.titre+"<h2></a>"
    }
}

const menu = document.querySelector(".Burger_menu")
menu.addEventListener("click", burger_visible)

//Permet d'afficher le burger menu en cliquant sur l'icone correspondante
function burger_visible() {
    el = document.querySelector(".popup")
    if (el.classList.contains("popup-invisible")) {
        el.classList.remove("popup-invisible")
        el.classList.add("popup-visible")
        menu.classList.remove("off")
        menu.classList.add("on")
    }
    else {
        el.classList.remove("popup-visible")
        el.classList.add("popup-invisible")
        menu.classList.remove("on")
        menu.classList.add("off")
    }
}

const mentions = document.querySelector(".mentions")
mentions.addEventListener("click", mentions_visibles)

//Permet de faire la même chose que la fonction ci dessus, mais cette fois si pour le bouton mention légales
function mentions_visibles() {
    texte_mentions()
    el = document.querySelector(".popup_mentions")
    if (el.classList.contains("popup-invisible")) {
        el.classList.remove("popup-invisible")
        el.classList.add("popup-visible")
    }
    else {
        el.classList.remove("popup-visible")
        el.classList.add("popup-invisible")
    }
}

const envoyer_form = document.getElementById("Envoyerform")
envoyer_form.addEventListener("click", ajouter_analogie)


//Permet d'ajouter une prévisualisation de l'analogie crée grâce au formulaire avant envoi sur l'API
function ajouter_analogie() {
    const input_analogie = document.getElementById("analogie").value
    const input_valeurAnalogie = document.getElementById("valeurAnalogie").value
    const input_titre = document.getElementById("titre").value
    const input_explication = document.getElementById("explication").value
    const Email = document.getElementById("mail").value

    
    objet_analogie = {"analogie":input_analogie, "valeurAnalogie":input_valeurAnalogie, "titre":input_titre, "explication":input_explication, "image":image_analogie, "id":"preview", "preview":"PREVISUALISATION"}
    url="https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&courriel=" + Email + "&login=noah.calmette&message=Si jétais_" + input_analogie + "_je serais_" + input_valeurAnalogie + "_car " + input_explication + "_Votre image_" + image_analogie;
    analogies(objet_analogie)
    scroll()
};
    


//Permet de transformer l'image provenant du PC de l'utilisateur en un lien utilisable sur la page
var loadFile = function(event) {
    image_analogie =  "<img class=Imageclickable src=" + URL.createObjectURL(event.target.files[0])+ ">"
    lien = URL.createObjectURL(event.target.files[0])
    document.querySelector(".centrer").innerHTML += lien
};

//Permet d'afficher la prévisualisation ainsi que la fenêtre de confirmation avant envoi
function scroll() {
    document.getElementById('preview').scrollIntoView();

    setTimeout(() => {
        if (confirm("Êtes vous satisfait de votre analogie ?") == true) {
            if (confirm("Consentez vous à ce que vos données personelles (adresse de courriel et adresse IP) soient conservées pendant un an au maximum ? \nResponsable du traitement de vos données: Philippe Gambette (philippe.gambette@univ-eiffel.fr)") == true) {
                window.open(url)
            }    
            else {
                alert("Conformément à la RGPD, il est obligatoire que vous acceptiez ces conditions, autrement il nous sera impossible d'inclure votre analogie dans ce site web")
                window.location.reload();
            }
        } 
        else {
        window.location.reload();
      }}, 100);
    

}

right = document.querySelector(".right_arrow")
right.addEventListener("click", mention_suivante)

left = document.querySelector(".left_arrow")
left.addEventListener("click", mention_precedente)

const contenu_mentions = document.querySelector(".contenu_mentions")

//Permet d'afficher le contenu des mentions légales dans la modale correspondante
function texte_mentions() {
    if (mention == 1) {
        contenu_mentions.innerHTML = "<h1> Crédits Photos</h1> <p> Arcane.jpg : Konan-Hoel Lesault </p> <p> Chess.jpg : https://www.publicdomainpictures.net/pictures/80000/nahled/chess-pieces-1393149435Wcf.jpg </p><p> Erable.jpg : https://c.pxhere.com/images/9e/15/bb7b15c1685a6b83751b56e36c85-1629816.jpg!d  </p> <p> Kirby.gif : https://www.tumblr.com/k-eke/67196140337/dancer-kirby-a-power-i-created-jaimerais </p><p> Purple.jpg: https://images.pexels.com/photos/3109808/pexels-photo-3109808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 </p> <p> Goat.jpg : https://upload.wikimedia.org/wikipedia/commons/3/3d/Feral_Goat_Glendalough.jpg </p><p> Langue.jpg : https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_South_Korea_%28cropped%29.jpg </p>" 
    }

    else if (mention ==2 ) {
        contenu_mentions.innerHTML = "<h1> Introduction </h1><p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., il est porté a la connaissance des utilisateurs et visiteurs, ci-apres l'Utilisateur', du site https://etudiant.u-pem.fr/~noah.calmette/portrait-chinois/ , ci-apres le 'Site', les présentes mentions légales. La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</p>"
    }

    else if (mention == 3) {
        contenu_mentions.innerHTML = "<h1> L'Editeur </h1><p>L’édition et la direction de la publication du Site est assurée par Calmette Noah, domicilié 20 Rue des Roseaux, dont le numéro de téléphone est 0783859981, et l'adresse e-mail noahcalmette@gmail.com.ci-apres l'Editeur'.</p>" 
    }

    else if (mention == 4) {
        contenu_mentions.innerHTML = "<h1>Collecte de données</h1><p>Le Site assure a l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés. En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'acces, de rectification, de suppression et d'opposition de ses données personnelles L'Utilisateur exerce ce droit : </br> · via un mail adressé au responsable du traitement des données  </p>"
    }
}

//Permet de passer a la page suivante des Mentions légales
function mention_suivante() {
    if (mention >= 4) {
        mention = 1
        texte_mentions()
    }
    else {
    mention +=1
    texte_mentions()
    }
}

//Permet de passer à la page précédente des Mentions légales
function mention_precedente() {
    if (mention <= 1) {
        mention = 4
        texte_mentions()
    }
    else {
    mention -=1
    texte_mentions()
    }
}