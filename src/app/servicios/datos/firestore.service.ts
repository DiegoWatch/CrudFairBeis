import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from "@angular/fire/firestore";
import { cancer } from "src/app/cancer";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore:AngularFirestore) { }

  crearDatosPaciente(edad: number,genero: string,fumador: string,obesidad: string,tosSeca: string,ronquidos: string,tomaAlcohol: string,alergiaPolvo: string,riesgoGenetico: string,riesgoOcupacionales: string):Promise<void> {
   const id= this.firestore.createId();
   return this.firestore.doc(`DatosPaciente/${id}`).set({id,edad,genero,fumador,obesidad,tosSeca,ronquidos,tomaAlcohol,alergiaPolvo,riesgoGenetico,riesgoOcupacionales});
  }
 
  obtenerDatosPaciente():AngularFirestoreCollection<cancer>{
  return this.firestore.collection('DatosPaciente'); 
  }

  detalleDatosPaciente(idPaciente: string):AngularFirestoreDocument<cancer>{
   return this.firestore.collection(`DatosPaciente`).doc(idPaciente);
  }

  eliminarDatosPaciente(idPaciente: string):Promise<void>{
   return this.firestore.doc(`DatosPaciente/${idPaciente}`).delete();
  }



}
