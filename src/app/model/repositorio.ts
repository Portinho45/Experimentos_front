import { Estudiante } from "./estudiante"

export class Repositorio{
  id:number =0
  nombreRepositorio: string =""
  descripcionRepositorio: string =""
  enlaceRepositorio:string =""
  fechaRepositorio: Date = new Date(Date.now())
  estudiante: Estudiante = new Estudiante()
}
