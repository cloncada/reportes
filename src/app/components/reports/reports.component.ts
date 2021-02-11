import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import jsPDF from 'jspdf';  
  
import html2canvas from 'html2canvas';  
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private service:ServicesService) { }

  reportes = [];

  ngOnInit(): void {
    this.service.getReports().subscribe(reportes => {
      this.reportes=reportes;



    });
  }
  descargar(){
    var data = document.getElementById('tabla');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 100;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('tabla.pdf'); // Generated PDF   
    });  

    
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('tabla');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, "tabla.xlsx");
 
  }
  descargarWord(){
    var data = document.getElementById('tabla');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 100;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('tabla.docx'); // Generated PDF   
    });  

    
  }

  exportarWord() {
 
    if (!window.Blob) {
       alert('Your legacy browser does not support this action.');
       return;
    }
 
    var html, link, blob, url, css;
    
    // EU A4 use: size: 841.95pt 595.35pt;
    // US Letter use: size:11.0in 8.5in;
    
    css = (
      '<style>' +
      '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
      'div.WordSection1 {page: WordSection1;}' +
      'table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}'+
      '</style>'
    );
    
    html 
    blob = new Blob(['\ufeff', css + html], {
      type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = 'Document';   
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, 'Document.doc'); // IE10-11
        else link.click();  // other browsers
    document.body.removeChild(link);
  };
 
}
