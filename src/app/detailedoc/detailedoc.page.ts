import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { FunctionService } from '../services/function.service';


@Component({
  selector: 'app-detailedoc',
  templateUrl: './detailedoc.page.html',
  styleUrls: ['./detailedoc.page.scss'],
})
export class DetailedocPage implements OnInit {

  docflow: any;
  docdetail: any;
  doctree: any;
  doccomment: any;
  constructor(
    public navCtrl: NavController,
    private Menu: MenuController,
    public http: HttpClient,
    public loadingController: LoadingController,
    private functionservice: FunctionService,
    private storage: Storage
  ) { }


  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.Menu.enable(false);
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1'); 
    this.storage.remove('docflow');
  }
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.Menu.enable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  ngOnInit() {
    this.storage.get('docflow').then((parameter) => {
      this.docflow = parameter;


      let postData1 = new FormData();
      postData1.append('DocOID', this.docflow.DocOID);
      this.http.post("https://app.rmutp.ac.th/api/edoc/node", postData1)
        .subscribe(data => {
          this.docdetail = data[0]["detail"][0];
          this.doctree = data[1]["Table"];
          this.doccomment = data[2]["Table"];
          console.log(this.docdetail);
          console.log(this.doctree);
          console.log(this.doccomment);
        }, error => {
          console.log(error);
        });
    });
  }

  goback() {
    console.log(this.docflow);
    // this.navCtrl.back();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

  }

}
