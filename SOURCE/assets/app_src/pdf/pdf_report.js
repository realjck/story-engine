/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

pdf_report
* using EasyPDF class *
*/

define(['pdf/EasyPDF', 'engine/Player'], function(EasyPDF, Player) {

  return {
    print: function (rapport) {

      EasyPDF({
        name: "rapport_erreur",
        unit: "pt", // only pt supported with autoTable (not mm or in)
        fontcolor: "#242415",
        fontsize: 12,
        orientation: "p",
        content: function() {
          
          var self = this;
          var page_counter = 0;
          
          var rows = [];
          
          var columns = [
            {title: "Propriété", dataKey: "col1"},
            {title: "Valeur", dataKey: "col2"}
          ];
          
          var line1 = {};
          var line2 = {};
          var line3 = {};
          var line4 = {};
          var line5 = {};
          var line6 = {};
          
          line1["col1"] = "Message";
          line1["col2"] = rapport.message;
          
          line2["col1"] = "Source";
          line2["col2"] = rapport.source;
          
          line3["col1"] = "N° ligne";
          line3["col2"] = rapport.noligne;
          
          line4["col1"] = "N° colonne";
          line4["col2"] = rapport.nocolonne;
          
          line5["col1"] = "Erreur";
          line5["col2"] = rapport.erreur;
          
          line6["col1"] = "Bookmark";
          line6["col2"] = rapport.bookmark;
          
          rows.push(line1);
          rows.push(line2);
          rows.push(line3);
          rows.push(line4);
          rows.push(line5);
          rows.push(line6);
          
          // AUTOTABLE
          this.autoTable(columns, rows, {
            // Styling
            theme: 'grid', // 'striped', 'grid' or 'plain'
            styles: {
              cellPadding: 5,
              fontSize: 10,
              font: "helvetica", // helvetica, times, courier
              lineColor: [50,50,50],
              lineWidth: 0.1,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
              textColor: [50,50,50],
              halign: 'left', // left, center, right
              valign: 'top', // top, middle, bottom
              fillStyle: 'S', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
              columnWidth: 'auto' // 'auto', 'wrap' or a number
            },
            headerStyles: {
              fillColor: [191, 191, 191],
              fillStyle: "DF",
              halign: 'center'
            },
            // Properties
            startY: false, // false (indicates margin top value) or a number
            pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            tableWidth: 'auto', // 'auto', 'wrap' or a number, 
            margin: {
              top: 126
            },
            beforePageContent: function(data) {
              self.text("Rapport d'erreur", 562, 32, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
              moment.locale("fr");
              self.text("le "+moment().format('LL'), 562, 50, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
              page_counter++;
              self.text(page_counter.toString(), 297,839, {fontsize:10, align:"center"});
            }
          });

        }
      });
    }
  };
});
