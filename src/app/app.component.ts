import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, NavController,LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [    
    {
      title: 'List',
      url: '/litsbook',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  Logout: any;
  UserData: any;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
    this.menuCtrl.close();
    this.storage.get('UserData').then((val) => {
      this.UserData = val;
      console.log(val);
      console.log('Load remem user is seccers')
      this.UserData.Remember = false;
      this.storage.set('UserData', this.UserData);
      this.router.navigateByUrl("/login");
      loading.dismiss();
    });
  }

}
