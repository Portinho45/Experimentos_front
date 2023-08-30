import { Institucion_Educativa } from "./institucion"
import { Usuario } from "./usuario"

export class Estudiante{
  idEstudiante:number =0
  semestre_Estudiante: number =0
  edad_Estudiante:number =0
  genero_Estudiante:string =""
  practicante_Estudiante:boolean = true
  descripcion_Estudiante:string =""
  institucion_Estudiante:Institucion_Educativa= new Institucion_Educativa()
  usuario_Estudiante: Usuario= new Usuario()
}
