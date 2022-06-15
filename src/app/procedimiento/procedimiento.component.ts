import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";

import { ProcedimientoPendiente } from '../model/procedimiento-pendiente';
import { ProcedimientoService } from '../service/procedimiento-srv';
@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.scss']
})
export class ProcedimientoComponent implements OnInit {
  public decodedJwt: Object;
  public token: string;
  public b64 : string;
  procedimientos: ProcedimientoPendiente[];
  //procedimientos = [];
  userId : any;
  procedimientoSeleccionado? : ProcedimientoPendiente;
  constructor(private procedimientoService: ProcedimientoService) { }

  ngOnInit() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    this.userId  =  searchParams.get('userId');
    this.b64  =  searchParams.get('token');
    this.token = atob(this.b64)
    this.decodedJwt = jwt_decode(this.token);
    console.log(this.decodedJwt) /* JWT */
    this.reloadData();
  }


  public clickBtn(): void {

    const object: Object = {
      idDispositivo: 5,
      x: '-99.129044',
      y: '19.376918',
      origen:  'CAMARA',
      descripcion: 'prueba',
      identificadorCamara: 1, /*  Identificador camara */
      uuidOrigen: 5,

    }

    this.procedimientoService.requestTest(object).subscribe((res: any) => {
      if(res)
        console.log(res)
    })

  }

  reloadData() {
    this.procedimientoService.buscarProcedimientoPorUsuarioAsignado(this.userId).subscribe(data => {
      this.procedimientos = data;
    });
  };

  onSelect(procedimiento_: ProcedimientoPendiente): void {
    this.procedimientoSeleccionado =  Object.assign({}, procedimiento_); ;
    this.procedimientoSeleccionado.actualizadoPor = this.userId;
  }

  actualizarProcedimiento() {
    this.procedimientoService.actualizarProcedimiento(this.procedimientoSeleccionado.id,this.procedimientoSeleccionado)
      .subscribe(data => {
        this.reloadData();
      }, error => console.log(error));
    this.procedimientoSeleccionado = null;
  }

  finalizarProcedimiento() {
    this.procedimientoService.finalizarProcedimiento(this.procedimientoSeleccionado.id,this.procedimientoSeleccionado)
      .subscribe(data => {
        this.reloadData();
      }, error => console.log(error));
    this.procedimientoSeleccionado = null;
  }

}
