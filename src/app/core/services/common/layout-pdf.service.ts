import { Injectable } from '@angular/core';
import * as Const from '@app/common/const';
import  jsPDF  from 'jspdf';
import  autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class LayoutPdfService {

  constructor() { }

  exportPDFChuyen(header: any,dataheader:any, dataheader2:any,data: any, headerp2:any, datapage2:any,title: string, ngay: string, footer1?: string, footer2?:string) {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addFileToVFS("WorkSans-normal.ttf", Const.font);
    pdf.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    pdf.setFont("WorkSans");
    pdf.setFontSize(9);
    pdf.text(ngay,30,30);
    pdf.setFontSize(20);
    pdf.text(title,150,40);
    pdf.setFontSize(11);
    let y = 80;
    for(let element of dataheader) {
      pdf.text(element.field + " " + element.value,50,y);
      y = y + 20;
    }
    y = 80
    for(let element of dataheader2) {
      pdf.text(element.field + " " + element.value,300,y);
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
      startY: 200,
    });
    pdf.addPage();
    pdf.setFontSize(12);
    autoTable(pdf,{
      head: headerp2,
      body: datapage2,
      theme: 'grid',
      didDrawCell: (data: {column:{index:any;};})=>{
        console.log(data.column.index);
      },
      styles: {font: "WorkSans"},
      startY: 70,
    });
    pdf.setFontSize(10);
    if(footer1) {
      pdf.text(footer1,100,700);
    }
    if(footer2) {
      pdf.text(footer2,400,700);
    }
    
    // new window pdf
    pdf.output('dataurlnewwindow');
  }

  exportPDF(header: any,dataheader:any,data: any,title: string, ngay: string, footer1?: string, footer2?:string) {
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
    pdf.setFontSize(10);
    if(footer1) {
      pdf.text(footer1,100,700);
    }
    if(footer2) {
      pdf.text(footer2,400,700);
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
