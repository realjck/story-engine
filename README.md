# E-LEARNING ENGINE ANIMATE JS

Version 4.2 // 11/2023

# About

## Streamlining Digital Learning: Use Adobe Animate with a Comprehensive Toolbox and Ready-to-Use Template for Stories* in Full JavaScript

### [[Click here to launch the repository source sample]](https://realjck.github.io/ELEARNING-ENGINE/SOURCE/index.html)

_* A story presented in a linear format with chapters, featuring animated characters with voice-overs. Each chapter includes scenes, informative content screens, quizzes, and other interactive activities. The content is seamlessly integrated with bookmarks and tracking functionality for Learning Management Systems, such as Moodle._

## Features:

- **Cross-Platform Compatibility:**
   Ensures optimal performance on Android, iOS, and web platforms with responsive and full-screen modes, incorporating mobile detection capabilities.

- **Enhanced Interactivity:**
   Provides diverse interactive elements such as multiple-choice quizzes, classification exercises, click interactions, and drag-and-drop features. Additionally, allows the creation of custom interactive screens using external JS files and JSON content.

- **Automated Module Content Management:**
   Implements automated content handling through XLS parsing, seamlessly integrated within a "./assets/data/story.xls" Excel file.

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

A Windows batch file is ready to use to recompile the source: open a cmd console and launch `SOURCE/assets/app_src/COMPILE.BAT` (For Linux / Mac users you can find .sh scripts as well in `app_src/dojo/util/buildsripts/`)

This will compile your `app_src/` into a new file in `app/App.js.uncompressed.js`.

> Please be advised that the generated file is in an uncompressed state, and the minified version of App.js has been omitted due to potential compatibility issues with certain modern browsers arising from Dojo's minimization process. Should you desire a minified version, you have the option to employ a minification tool of your choosing.

## File `Animate.fla`:

### Customization of Interface Elements:

<img src="./presentation-version-history/screenshot1.jpg" alt="screenshot"/> 

---

### Placement of Backgrounds and Characters / Settings for Storyboard Shots (Scenes with characters have a JS code frame at their root to declare the characters used and the camera positions):

<img src="./presentation-version-history/screenshot2.jpg" alt="screenshot"/>

---

### Word to Excel Generator with VBA Script `STORYBOARD-XLS-DATA-MAKER/` for Content Creation:

An EXCEL-IMPORTER.XLSM file allows the transformation of a scenario created in Word into a story.xls file that can be read by the program (`./STORYBOARD-XLS-DATA-MAKER/CONSTRUCTION_WORD_IMPORTER.vba`)

<img src="./presentation-version-history/screenshot3.jpg" alt="screenshot"/> 

### Customization and Modifications of the generated Excel Workbook:

<img src="./presentation-version-history/screenshot4.jpg" alt="screenshot"/>

### Execution in Browser / LMS Environment (Moodle, etc.):

<img src="./presentation-version-history/screenshot5.jpg" alt="screenshot"/>

<img src="./presentation-version-history/screenshot6.jpg" alt="screenshot"/>

---

# Integration Instructions

## CGENERATING THE STORYBOARD FROM A Word Document (formatted with Styles as outlined in the template):

### Launch `XLS_CONSTRUCTION/CONSTRUCTION WORD IMPORTER.xlsm` and run the script

### Select the Word document for conversion to Excel

### Within the generated XLS file, execute the following actions:
- Set all titles as `TITRE:......,DECOR:.....` to define the Animate scenes desired for each chapter
- Ensure that the final quiz sheet is named QUIZ_FINAL

# Possible Modifications in the Excel workbook:

## STORY SHEET:

### 'deroule' column:

Syntax	| Description
--- | ---
`CONTENU_xxxxxx` | Content screen with anchoring + images
`QUIZ_xxxxxx` | Multiple-choice quiz
`VIDEO_myvideo` | plays the video assets/videos/myvideo.mp4 (recommended format: 1280x640, .mp4 (h264), around 700kbs)
`DECOR:______` | allows a transition of the background within a chapter
`DECOR:______,FADE:true` | same as above but with a fade-in effect to black

### 'perso' column:

Syntax	| Description
--- | ---
`perso{turn}` or `perso{turnstay}`	|	turns the character to the other side at the time of the line, either once or permanently
`{all}`	|	lip synchronization of the sound on all characters in the scene (chorus)
`{none}`	|	no lip synchronization (e.g., sound effect)

### 'script' column:

Possibility to add JS script in the 4th column of the STORY sheet. Example: `Tween.init(scene.pot_de_fleur, {pop:true})` - the keyword 'scene' corresponds to the MovieClip of the current scene

## SYNTAX OF 'QUIZ_xxx' SHEETS:

Copy and paste questions from an existing model (the 'instruction' line is optional, and the 'feedback' line is mandatory (leave empty if not used).

A sheet has the capacity to include any quantity of questions.

A question can have up to six answers.

The correct answer is indicated by the word `ok`. It is possible to have one correct answer (QCU) or multiple (QCM)
Note that it is possible to force the possibility of multiple answers for a QCU by using `okm` instead of `ok`.

## SYNTAX OF 'CONTENU_xxx' SHEETS:

### 'texte' column:

Syntax			|	Description
--- | ---
`xxxxxxxxxx`		| 	< normal-sized text
`GRAS:xxxxxxxxx`	|	< bold text
`SMALL:xxxxxxxxx`	|	< smaller text
`-xxxxxxxxxxxxx`	|	< smaller text with bullet point
`espace`			|	< space line

### 'media' column:

Syntax			|	Description 							
 ---- | ----
`IMG:xxxxx.png`	| 	< adds an image to the left of the text (extends in height when repeated over several consecutive cells)
`IMGLINE:xxxxx.png`	|	< adds an image to the left of the height of the first line of text
`IMGCORNER:xxxxx.png`	|	< adds an image in the top right of the screen
`SON:xxxxxx.mp3`	|	< adds sound in sync with the line (requires a character)

### Possibility of dialog with a character in an informative content screen (with the lines of dialog read from the STORY sheet):

**Example:** `CONTENU_MYCONTENT,4` where:

- `CONTENU_MYCONTENT` references the corresponding content sheet in the workbook

- `,4` corresponds of the 4 next lines of character dialog in the STORY Sheet below the command

Will lead to this result :

> If the value of 4 matches the number of lines in the corresponding CONTENU_MYCONTENT sheet, it means that the texts and voice-overs are synchronized in their appearance. Alternatively, if the number of lines of CONTENU_MYCONTENT is different than 4, theses 4 lines of dialogue are spoken after all the content elements have been presented on the screen.

> Note that it is also possible to put voice-over sounds in the SON column of the content sheet (see table above), but these **do not display subtitles** because it is considered that they take up the audio reading of the displayed text.

# Finalization / SCORM Export / Online Publishing:

## Save the Excel in assets/data/ and edit `app/data/ExcelName.js` to indicate its filename:

Filename of Excel workbook can be any name:

~~~~
	var __ExcelName = "MyStoryV1.xls";
	var __Langs = ["en"];
~~~~

### DEFINE MULTI-LANGUAGE (OPTIONAL):
In the case of multi-language, several Excel files must be in the data/ folder, each ending with "-XX" (XX corresponding to the language)

**Example of ExcelName.js for multilingual fr + en:**

~~~
	var __ExcelName = "story.xls";
	var __Langs = ["en", "fr"];
~~~

(In this case, the corresponding Excel files will be `story-fr.xls` and `story-en.xls`)

### MODIFY THE CONFIGURATION FILE `assets/app/CONFIG.js` FOR SCORM PACKAGING (if required)

**Enables customization of the following options:**

- `__lang: string ('fr', 'en', ...)` - The initial language setting upon launch pertains to the messages preceding the module's initiation. After launch, the language isdynamically detected based on the specification in the Excel CONFIG sheet.

- `__nofs: bool` - The option to enable or disable full-screen mode is provided. In certain deployment environments, full-screen functionality may encounter limitations. To address this scenario, this option can be configured to `true` to conceal the full-screen button within the interface.

- `__disableAjax: bool` - During startup, the module conducts AJAX requests to determine the existence of SCORM 1.2 / 2004 files. If there is a need to disable these requests, this option can be set to `true`. In such instances, it is necessary to manually declare the SCORM version in `app/launcher.js` at line 54: `__scorm = "1.2"` (or "2004"). Additionally, the SCORM detection can be turned off by modifying line 55 to change `__gm = "lms"` to `"web"`.

### MAKE SURE THAT INDEX.HTML IS IN PRODUCTION MODE
~~~~
!-- to modify for prod -->
<!-- <script src="assets/app_src/config/dojoConfig.js"></script> -->
<!-- <script data-dojo-config="async: true" src="assets/app_src/dojo/dojo/dojo.js"></script> -->
<script data-dojo-config="async: true" src="assets/app/App.js.uncompressed.js"></script>
~~~~

### PLACE THE SCORM FILES AT THE ROOT / ZIP PACKAGER

/ Launch `index.html`

---

# MIT License

Copyright 2023 JCK

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.