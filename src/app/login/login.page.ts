import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MenuController,NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  UserData = { 'username': "", 'password': "", 'Remember': false };

  //http: any;
  constructor(
    private router: Router,
    public http: HttpClient,
    public alerCtrl: AlertController,
    private storage: Storage,
    private Menu: MenuController,
    private navCtrl: NavController
  ) { } 

  ionViewDidEnter() {
    this.Menu.enable(false);    
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.Menu.enable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }
  ionViewDidLeave() {
    console.log("login close");
  }

  GoHomePage() {
    this.router.navigateByUrl('/litsbook');
  }
  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.logout = params['logout'];
    // });
    // console.log(this.logout);
    // if(this.logout == true){
    //   this.storage.remove('UserData');
    //   console.log('Remove Sccsecs');
    // }
    // console.log(this.UserData);    
    this.storage.get('UserData').then((val) => {      
        this.UserData = val;
        console.log(val);
        console.log('Load remem user is seccers')
        if (this.UserData.username != "" && this.UserData.password != "" && this.UserData.Remember == true) {
          this.Login();
        }    
    });
  }

  Login() {

    let postData = new FormData();
    postData.append("Username", this.UserData.username);
    postData.append("Password", this.UserData.password);

    console.log(this.UserData);

    this.http.post("https://app.rmutp.ac.th/api/Login", postData)
      .subscribe(data => {
        console.log(data);
        if (data['status'] == "Failed") {
          this.incorrectAlert();
        }
        if (data['status'] == "OK" && data['company'] != "STUDENT") {
          this.storage.set('UserData', this.UserData);
          console.log(this.UserData);
          console.log('login!!');
          this.GoHomePage();
        }
        if (data['status'] == "OK" && data['company'] == "STUDENT") {
          this.stdAlert();
        }
      }, error => {
        console.log(error);
      });


  }
  async incorrectAlert() {
    const alert = await this.alerCtrl.create({
      header: 'Username or Password is incorrect!!!',
      subHeader: '',
      message: 'Please Check Your Username or Password.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async stdAlert() {
    const alert = await this.alerCtrl.create({
      header: "Your username and password is can't login!!!",
      subHeader: '',
      message: "Your Identity is can't login.",
      buttons: ['OK']
    });

    await alert.present();
  }
}