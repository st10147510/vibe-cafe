import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public readonly email: string = '';
  public readonly password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async login() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();

    this.authService.login(this.email, this.password).subscribe(
      async (res: any) => {
        await loading.dismiss();
        this.router.navigate(['/main/tabs/tab1']); // Redirect to home or another page
      },
      async (error: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: 'Invalid email or password.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
