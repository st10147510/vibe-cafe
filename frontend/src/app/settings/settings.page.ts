import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  enableNotifications: boolean = true;
  theme: string = 'light';
  username: string = '';

  constructor(private storage: Storage) {
    this.loadSettings();
  }

  async loadSettings() {
    this.enableNotifications = (await this.storage.get('notifications')) ?? true;
    this.theme = (await this.storage.get('theme')) ?? 'light';
    this.username = (await this.storage.get('username')) ?? '';
  }

  async saveSettings() {
    await this.storage.set('notifications', this.enableNotifications);
    await this.storage.set('theme', this.theme);
    await this.storage.set('username', this.username);
  }
}
