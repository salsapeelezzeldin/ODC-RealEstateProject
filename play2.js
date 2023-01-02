var PDFDocument = require('pdfkit');
var fs = require('fs')

doc = new PDFDocument;    
doc.pipe(fs.createWriteStream('outputt.pdf'));    
//doc.font('fonts/PalatinoBold.ttf').fontSize(25).text(100, 100);