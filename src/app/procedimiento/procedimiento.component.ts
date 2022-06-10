import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { ProcedimientoPendiente } from '../model/procedimiento-pendiente';
import { ProcedimientoService } from '../service/procedimiento-srv';
@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {

  procedimientos: ProcedimientoPendiente[];
  //procedimientos = [];
  userId : any;
  procedimientoSeleccionado? : ProcedimientoPendiente;
  constructor(private procedimientoService: ProcedimientoService) { }

  ngOnInit() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    this.userId  =  searchParams.get('userId');
    this.reloadData();
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
