import { Injectable } from '@angular/core';
import { ProcedimientoPendiente } from "../model/procedimiento-pendiente";
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProcedimientoService {
  public globalUrl: string = 'http://c5-amb-qa.promad.com.mx:9194';
  private baseUrl = '/api';

  public headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  public requestTest(data: Object): Observable<any> {
    return this.http.post(`${this.globalUrl}/api/emergenciasExternas/eventoCamara`, data, { headers: this.headers });
  }

  buscarProcedimientoPorUsuarioAsignado(id: number): Observable<ProcedimientoPendiente[]> {  
    return this.http.get<ProcedimientoPendiente[]>(`${this.baseUrl}/procedimiento/asignado/${id}`);  
  }  
  actualizarProcedimiento(id: number,procedimiento: ProcedimientoPendiente): Observable<ProcedimientoPendiente> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<ProcedimientoPendiente>(`${this.baseUrl}/procedimiento/${id}`,  
    procedimiento, httpOptions);  
  }
  finalizarProcedimiento(id: number,procedimiento: ProcedimientoPendiente): Observable<ProcedimientoPendiente> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<ProcedimientoPendiente>(`${this.baseUrl}/procedimientoFinalizar/${id}`,  
    procedimiento, httpOptions);  
  }
  /*getEmployeeById(employeeId: string): Observable<ProcedimientoPendiente> {  
    return this.http.get<ProcedimientoPendiente>(this.url + '/GetEmployeeDetailsById/' + employeeId);  
  }  
  createEmployee(employee: ProcedimientoPendiente): Observable<ProcedimientoPendiente> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<ProcedimientoPendiente>(this.url + '/InsertEmployeeDetails/',  
    employee, httpOptions);  
  }  
    
  deleteEmployeeById(employeeid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteEmployeeDetails?id=' +employeeid,  
 httpOptions); 
  }
*/

/*export const PROCEDEMIENTOS: ProcedimientoPendiente[] = [
    { id: 16, comentario: null, fecha: new Date().getTime(), terminada: false, titulo: 'RubberMan' },
    { id: 17, comentario: null, fecha: new Date().getTime(), terminada: false, titulo: 'Dynama' },
    { id: 18, comentario: null, fecha: new Date().getTime(), terminada: false, titulo: 'Dr. IQ' },
    { id: 19, comentario: null, fecha: new Date().getTime(), terminada: false, titulo: 'Magma' },
    { id: 20, comentario: null, fecha: new Date().getTime(), terminada: false, titulo: 'Tornado' }
  ];
*/
  
}
