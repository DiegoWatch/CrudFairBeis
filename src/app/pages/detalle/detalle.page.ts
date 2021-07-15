import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "src/app/servicios/datos/firestore.service";
import { Router,ActivatedRoute } from "@angular/router";
import {AlertController  } from "@ionic/angular";


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
   cancer:any={}; 
   idPaciente:any;
  constructor(public fs:FirestoreService, public r:Router, 
    public ar:ActivatedRoute,public AC:AlertController) { }

  ngOnInit() {
  this.idPaciente=this.ar.snapshot.paramMap.get('id');
  this.cancer=this.fs.detalleDatosPaciente(this.idPaciente).valueChanges();

  }

  async eliminarDatosPaciente(){
   const Alert= await this.AC.create({message:'Estas seguro de que quieres eliminar los datos del paciente?',buttons:[
    {  
    text: 'Cancel', role: 'cancel' , handler:blah =>{ 
      console.log('Confirma la cancelacion: blah')
    },
    },
     { 
      text: 'OK', handler:() =>{ 
        this.fs.eliminarDatosPaciente(this.idPaciente).then(()=>
         { this.r.navigateByUrl('/home')}
        );

      },
      
       },], 
    });
    
    await Alert.present();  
  }
}
