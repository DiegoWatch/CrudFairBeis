import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from "@angular/forms";
import { LoadingController, AlertController  } from "@ionic/angular";
import { FirestoreService } from "src/app/servicios/datos/firestore.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
   public formularioCrear:any;
  constructor(public lc:LoadingController,public ac:AlertController,public fs:FirestoreService,public fb:FormBuilder,public router:Router) {
 
     this.formularioCrear= fb.group({
      edad:['', Validators.required],
      genero:['', Validators.required],
      fumador:['', Validators.required],
      obesidad:['', Validators.required],
      tosSeca:['', Validators.required],
      ronquidos:['', Validators.required],
      tomaAlcohol:['', Validators.required],
      alergiaPolvo:['', Validators.required],
      riesgoGenetico:['', Validators.required],
      riesgoOcupacionales:['', Validators.required]

     });
   }

  ngOnInit() {
  }

  async crearDatosPaciente(){
   const loading= await this.lc.create();
   const edad= this.formularioCrear.value.edad;
   const genero=this.formularioCrear.value.genero;
   const fumador=this.formularioCrear.value.fumador;
   const obesidad=this.formularioCrear.value.obesidad;
   const tosSeca=this.formularioCrear.value.tosSeca;
   const ronquidos=this.formularioCrear.value.ronquidos;
   const tomaAlcohol=this.formularioCrear.value.tomaAlcohol;
   const alergiaPolvo=this.formularioCrear.value.alergiaPolvo;
   const riesgoGenetico=this.formularioCrear.value.riesgoGenetico;
   const riesgoOcupacionales=this.formularioCrear.value.riesgoOcupacionales;

   this.fs.crearDatosPaciente(edad,genero,fumador,obesidad,tosSeca,ronquidos,tomaAlcohol,alergiaPolvo,riesgoGenetico,riesgoOcupacionales).then(
     ()=> {  
       loading.dismiss().then(()=>{

        this.router.navigateByUrl('/home');
       });

     },error => {
        console.error(error);});
       return  await loading.present();
   

  }
}
