import { Injectable } from '@angular/core';
import * as Const from '@app/common/const';
import  jsPDF  from 'jspdf';
import  autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class LayoutPdfService {

  constructor() { }

  exportPDF(header: any,dataheader:any,data: any,title: string, ngay: string) {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addFileToVFS("WorkSans-normal.ttf", Const.font);
    pdf.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    pdf.setFont("WorkSans");
    pdf.setFontSize(9);
    pdf.text(ngay,30,30);
    pdf.setFontSize(20);
    pdf.text(title,200,40);
    pdf.setFontSize(12);
    let y = 60;
    for(let element of dataheader) {
      pdf.text(element.field + " " + element.value,50,y);
      y = y + 20;
    }
    autoTable(pdf,{
      head: header,
      body: data,
      theme: 'grid',
      didDrawCell: (data: {column:{index:any;};})=>{
        console.log(data.column.index);
      },
      styles: {font: "WorkSans"},
      startY: 150,
    });
    // new window pdf
    pdf.output('dataurlnewwindow');

    // save file pdf
    // pdf.save();

  }
}
