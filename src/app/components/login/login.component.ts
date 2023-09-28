import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  showPassword: boolean = false;
  ngOnInit(): void {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        // Redirige a la nueva página
        this.router.navigate(['pages/Empresa']).then(() => {
          // Realiza la recarga de la página después de un retraso de 2 segundos
          setTimeout(() => {
            location.reload();
          }, 0); // 2000 milisegundos = 2 segundos
        });
      },
      (error) => {
        this.mensaje = 'El usuario o la contraseña son incorrectos';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

}
