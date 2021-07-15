import { Component } from '@angular/core';
import { FirestoreService } from "src/app/servicios/datos/firestore.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  DatosPaciente:any=[];
  Array:any=[];
  constructor(public fs: FirestoreService, public router:Router) {}


ngOnInit(){  
  this.DatosPaciente=this.fs.obtenerDatosPaciente().valueChanges();
    this.DatosPaciente.forEach(hola => {
      //console.log(hola);
      hola.forEach(je => {
      this.Array.push(je);
      //console.log(je);
      //console.log(this.Array);
      });
    });
    console.log(this.Array);
  
   
}

llamame() {
  console.log(this.Array);
}

async ExportCsv() {
  var csvData = await this.ConvertToCSV(this.Array);
  var a = document.createElement("a");
  a.setAttribute('style', 'display:none;');
  document.body.appendChild(a);
  var blob = new Blob([csvData], { type: 'text/csv' });
  var url= window.URL.createObjectURL(blob);
  a.href = url;
  var x:Date = new Date();
  var link:string ="DatosPacientes_" + x.getMonth() +  "_" +  x.getDay() + '.csv';
  a.download = link.toLocaleLowerCase();
  a.click();
  //this.llamame();
}

BorrarArray() {
   if(this.Array.length > 0) {
    this.Array.splice(0, this.Array.length);
    console.log(this.Array);
}

this.DatosPaciente=this.fs.obtenerDatosPaciente().valueChanges();
    this.DatosPaciente.forEach(hola => {
      //console.log(hola);
      hola.forEach(je => {
      this.Array.push(je);
      //console.log(je);
      //console.log(this.Array);
      });
    });
    console.log(this.Array);
    this.ExportCsv();
}

// convert Json to CSV data in Angular2
ConvertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

  for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ';';
  }
  row = row.slice(0, -1);
  //append Label row with line break
  str += row + '\r\n';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ';'

          line += array[i][index];
      }
      str += line + '\r\n';
  }
  return str;
}

}


