import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public readonly name: string = '';
  public readonly tel: string = '';
  public readonly email: string = '';
  public readonly password: string = '';
  public readonly confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Passwords do not match.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registering...',
    });
    await loading.present();

    this.authService.register(this.email, this.password).subscribe(
      async (res: any) => {
        await loading.dismiss();
        const successAlert = await this.alertController.create({
          header: 'Success',
          message: 'Registration successful!',
          buttons: ['OK'],
        });
        await successAlert.present();
        this.router.navigate(['/login']); // Redirect to login page
      },
      async (error: any) => {
        await loading.dismiss();
        const errorAlert = await this.alertController.create({
          header: 'Registration Failed',
          message: error.error.message || 'An error occurred during registration.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      }
    );
  }

}
