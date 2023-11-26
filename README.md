# E-LEARNING ENGINE ANIMATE JS

*Version 4.2 // 11/2023*

# <img src="./SOURCE/assets/images/langs/en.png" alt="en flag" width="25px"/> About

## Streamlining Digital Learning: Use Adobe Animate with a Comprehensive Toolbox and Ready-to-Use Template for Stories* in Full JavaScript

### [[Click here to launch the repository source sample]](https://realjck.github.io/ELEARNING-ENGINE/SOURCE/index.html)

_* A story presented in a linear format with chapters, featuring animated characters with voice-overs. Each chapter includes scenes, informative content screens, quizzes, and other interactive activities. The content is seamlessly integrated with bookmarks and tracking functionality for Learning Management Systems, such as Moodle._

## Features:

- **Cross-Platform Compatibility:**
   Ensures optimal performance on Android, iOS, and web platforms with responsive and full-screen modes, incorporating mobile detection capabilities.

- **Enhanced Interactivity:**
   Provides diverse interactive elements such as multiple-choice quizzes, classification exercises, click interactions, and drag-and-drop features. Additionally, allows the creation of custom interactive screens using external JS files and JSON content.

- **Automated Module Content Management:**
   Implements automated content handling through XLS parsing, seamlessly integrated within a "./assets/data/MyStory.xls" Excel file.

- **LMS Compatibility:**
   Supports both SCORM 1.2 and 2004 standards for Learning Management Systems, with automatic detection of connection modes for standard web usage.

- **Integrated Video Content:**
   Facilitates video integration in mp4 directly from the Excel Storyboard.

- **Packaged JS Libraries and Resources:**
   Eliminates reliance on CDNs or external resources, ensuring all assets libraries are statically copied for easy maintenance.

- **Resource Preloading:**
   Enhances user experience by preloading all module content, including voiceovers and images, upon launch.

- **Robust Error Handling:**
   In the event of a JavaScript error, generates a detailed PDF report and prompts the user to download it through a modal interface.

- **Multilingual Storyboards Management:**
   Offers language selection at launch, providing users with a multi-language experience.

- **Auto-Generated Certificates and PDFs:**
    Enables learners to download personalized final quiz reviews and school-branded certificates, featuring their name, score, and other relevant details.

- **Customizable:**
    Includes the source code in the repository, allowing for tool customization and extensibility.

## JS Librairies included:
- **Dojo Toolkit 1.17.3**
- **Create JS 1.0**
- Bootstrap 3.3.7 + bootstrap3-dialog
- download.js
- fontawesome 4.7.0
- jquery 1.12.4
- jquery easing 1.3
- js.cookie 2.1.4
- jspdf 1.5.3
- mediaelement
- moment.js with locales
- pipwerks SCORM API
- pleaserotate.js
- scroll-container-plus.js
- sheetjs / xlsx.js
- shortcut.js

## Important note

The entire project has been developed in ECMAScript Edition 5 (ES5), specifically tailored for utilization with the Dojo toolkit. The primary motivation for employing the Dojo toolkit lies in its capacity for asynchronous module handling.

This entails the utilization of `var` and DOM-declared variables, as well as the non-arrow function syntax `function(){}`.

While an update to a more recent ECMAScript version could prove beneficial for future development, it is not deemed necessary at present. The tool has undergone optimization over the years, ensuring compatibility with the latest browsers, such as Chrome and Safari.

## Usage

Clone the whole repository. All JS librairies are directly included (no installation).

## Customizations and Modifications in `app_src/`:

Package folder in `app_src/` | Description
--- | ---
`/dojo/` | Dojo Toolkit 1.17.3
`/animator/` | related to Adobe Animate (tween objects, buttons, quizzes, drag-drop, ...)
`/engine/` | main modules (`Player.js` contains the methods for the UI, Launch and SCORM, `ChapitrePlayer.js` contains the methods that parse the storyboard into playable actions)
`/util/` | modules not related to Adobe Animate (JsonHandler, Bootstrap modals, timers, sound management, etc.)
`/pdf/` | for pdf generation (see module `EasyPDF.js`)

---

### Comment/Uncomment these lines in `index.html` to switch between developement and production mode:

~~~~
!-- to modify for prod -->
<!-- <script src="assets/app_src/config/dojoConfig.js"></script> -->
<!-- <script data-dojo-config="async: true" src="assets/app_src/dojo/dojo/dojo.js"></script> -->
<script data-dojo-config="async: true" src="assets/app/App.js.uncompressed.js"></script>
~~~~

A BASH file is ready to use to recompile the source: open a cmd console and launch `SOURCE/assets/app_src/COMPILE.BAT` (For Linux / Mac users you can find .sh scripts as well in `app_src/dojo/util/buildsripts/`)

This will compile your `app_src/` into a new file in `app/App.js.uncompressed.js`.

> Please be advised that the generated file is in an uncompressed state, and the minified version of App.js has been omitted due to potential compatibility issues with certain modern browsers arising from Dojo's minimization process. Should you desire a minified version, you have the option to employ a minification tool of your choosing.


# <img src="./SOURCE/assets/images/langs/fr.png" alt="fr flag" width="25px"/> À propos

Base d'outils et template prêt à l'emploi pour la réalisation de modules d'apprentissage intéractifs avec **Adobe Animate**

## Fichier `Animate.fla` :

### Personnalisation possible des éléments d'interface :

<img src="./presentation-version-history/screenshot1.jpg" alt="screenshot"/> 

---

### Positionnement des décors et personnages / réglages des plans pour le storyboard (Les décors ont une frame de code JS à leur racine pour déclarer les personnages utilisés et les positions caméra) :

<img src="./presentation-version-history/screenshot2.jpg" alt="screenshot"/>

---

### Générateur Word vers Excel avec script VBA `STORYBOARD-XLS-DATA-MAKER/` pour la rédaction du contenu :

Un fichier EXCEL-IMPORTER.XLSM permet la transformation d'un scénario réalisé sous Word à un fichier story.xls pouvant être lu par le programme (`./STORYBOARD-XLS-DATA-MAKER/CONSTRUCTION_WORD_IMPORTER.vba`)

<img src="./presentation-version-history/screenshot3.jpg" alt="screenshot"/> 

### Personnalisation et modifications via classeur Excel `.assets/data/yourStory.xls` :

<img src="./presentation-version-history/screenshot4.jpg" alt="screenshot"/>

### Exécution dans navigateur / Environnement LMS (Moodle, etc.) :

<img src="./presentation-version-history/screenshot5.jpg" alt="screenshot"/>

<img src="./presentation-version-history/screenshot6.jpg" alt="screenshot"/>

---

# Mode d'emploi intégration

## CRÉATION DU SCENARIO Storyboard à partir d'un document Word (formaté avec Styles comme modèle fourni) :

1) Lancer `XLS_CONSTRUCTION/CONSTRUCTION WORD IMPORTER.xlsm` exécuter le script
---
2) Choisir le Word à transformer vers Excel
---
3) Dans le fichier XLS généré, effectuer les tâches suivantes :
- Passer tous les titres en `TITRE:......,DECOR:.....` pour définir les décors d'Animate voulus pour chaque chapitre
- S'assurer que la feuille du quiz final est bien appelée QUIZ_FINAL

*Note : Dans le prologue, la phrase qui commence par "retrouvons" est utilisé comme déclencheur pour afficher la vignette des personnages lorsque Marcillac présente.*


# Modifications possibles dans le XLS :

## FEUILLE STORY:

### colonne 'deroule' :

Syntaxe	| Description
--- | ---
`CONTENU_xxxxxx` | Ecran de contenu ancrage + images
`QUIZ_xxxxxx` | Quiz QCM/QCU
`VIDEO_myvideo` | joue la vidéo assets/videos/myvideo.mp4 (format recommandé : 1280x640, .mp4 (h264), autour de 700kbs)
`DECOR:______` | permet de faire une transition de décor à l'intérieur d'un chapitre
`DECOR:______,FADE:true` | idem précédent mais avec effet de fondu au noir en apparition
`SURMESURE_xxxxxx` | exécute l'écran sur-mesure contenu dans le script `xxxxxx.js` dans `app/` (bien penser à mettre nom du label/clip dans le JS, cf commentaires dans fichiers d'exemples fournis dans ce pack)

### colonne 'perso' :

Syntaxe	| Description
--- | ---
`perso{turn}` ou `perso{turnstay}`	|	tourne le personnage de l'autre côté au moment de la réplique soit 1 fois soit de manière permanente
`{all}`	|	synchro labiale du son sur tous les personnages de la scène (chorus)
`{none}`	|	aucune synchro labiale (exemple : bruitage)


### colonne 'script' :

Possibilité de rajouter du script JS dans la 4eme colonne de la feuille STORY. Ex.: `Tween.init(scene.pot_de_fleur, {pop:true})` - le mot clé 'scene' correspond au MovieClip de la scène en cours


## SYNTAXE DES FEUILLES 'QUIZ_xxx' :

Prendre un modèle existant et copier coller les questions (la ligne 'consigne' est facultative, et la ligne 'feedback' est quant à elle obligatoire (laisser vide si non utilisé).

La bonne réponse est indiquée par le mot "ok". Il est possible d'avoir une bonne réponse (QCU) ou bien plusieurs (QCM)
Notez qu'il est possible de forcer la possibilité de réponse multiple pour un QCU en utilisant "okm" à la place de "ok"


## SYNTAXE DES FEUILLES 'CONTENU_xxx' :

### colonne 'texte' :

Syntaxe			|	Description
--- | ---
`xxxxxxxxxx`		| 	< texte en taille normale
`GRAS:xxxxxxxxx`	|	< texte en gras
`SMALL:xxxxxxxxx`	|	< texte en plus petit
`-xxxxxxxxxxxxx`	|	< texte en plus petit avec bullet point
`espace`			|	< ligne d'espace (environ 2 lignes)


### colonne 'media' :

Syntaxe			|	Description 							
 ---- | ----
`IMG:xxxxx.png`	| 	< ajoute une image à gauche du texte (étendue en hauteur lorsque répété sur plusiers cases à la suite)
`IMGLINE:xxxxx.png`	|	< ajoute une image à gauche de la hauteur de la première ligne de texte
`IMGCORNER:xxxxx.png`	|	< ajoute une image en haut à droite de l'écran
`SON:xxxxxx.mp3`	|	< ajoute un son en synchro de la ligne (nécessite un personnage)

### Possibilité de faire de la SYNCHRO LIGNE PAR LIGNE avec un personnage (avec le contenu du dialogue depuis la feuille STORY) :

**Exemple :** `CONTENU_MONCONTENU, 4` : Si le chiffre 4 est égal aux nombre de lignes de la feuille CONTENU correspondante, alors il y a synchronisation de l'apparition des textes avec les voix-off. A contrario, les 4 lignes de dialogue sont lues une fois tous les élements de contenu affichés à l'écran.

Notez qu'il est aussi possible de mettre des sons voix-off dans la colonne SON (cf tableau ci-dessus), mais ceux-ci n'affichent pas de sous-titres, car l'on considère qu'il reprennent la lecure audio du texte affiché.

# Finalisation / Export SCORM / Mise en ligne :

## Enregistrer l'Excel dans assets/data/ et éditer `app/data/ExcelName.js` pour y indiquer le nom de celui-ci :

### DEFINIR LE MULTI-LANGUE (OPTION) :
Dans le cas du multi-langue, plusieurs fichiers Excel doivent être dans le dossier data/ , chacun finissant par "-XX", (XX correspondant à la langue)

**Exemple de ExcelName.js pour multilang fr + en :**

~~~
	var __ExcelName = "story.xls";
	var __Langs = ["en", "fr"];
~~~

(Les fichiers Excel correspondants seront dans ce cas : 'story-fr.xls' et 'story-en.xls')

**Dans le cas d'un module classique mono-langue, on aura :**

~~~~
	var __ExcelName = "story.xls";
	var __Langs = ["fr"];
~~~~

(Dans ce cas le module ne propose pas de choix de langue.)

### ÉDITER LA CONFIG POUR LA MISE EN PACK SCORM (si nécessaire)
Permet de régler la langue par défaut, le mode plein-écran, et la détection du scorm automatique

- `assets/app/CONFIG.js`

### S'ASSURER QUE L'INDEX.HTML EST EN MODE PROD
~~~~
!-- to modify for prod -->
<!-- <script src="assets/app_src/config/dojoConfig.js"></script> -->
<!-- <script data-dojo-config="async: true" src="assets/app_src/dojo/dojo/dojo.js"></script> -->
<script data-dojo-config="async: true" src="assets/app/App.js.uncompressed.js"></script>
~~~~

### PLACER LES FICHIERS SCORM À LA RACINE / PACKAGER .ZIP

/ Lancer `index.html` 


# Licence MIT

Droit d'auteur (c) [2023] [jck]

La présente autorise, gratuitement, toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), à traiter le Logiciel sans restriction, notamment, sans limitation, les droits d'utiliser, de copier, de modifier, de fusionner, de publier, de distribuer, de sous-licencier et/ou de vendre des copies du Logiciel, et d'autoriser les personnes à qui le Logiciel est fourni de le faire, sous réserve des conditions suivantes :

Le présent avis de droit d'auteur et cet avis d'autorisation doivent être inclus dans toutes copies ou parties substantielles du Logiciel.

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, NOTAMMENT, MAIS SANS S'Y LIMITER, LES GARANTIES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU DÉTENTEURS DU DROIT D'AUTEUR NE SERONT RESPONSABLES DE TOUT RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS UNE ACTION DE CONTRAT, DÉLIT OU AUTRE, DÉCOULANT DE, OU EN LIEN AVEC LE LOGICIEL OU L'UTILISATION, OU D'AUTRES TRAITEMENTS DANS LE LOGICIEL.
