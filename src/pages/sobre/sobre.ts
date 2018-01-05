import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
  providers: [
    Camera,
    BarcodeScanner,
    TextToSpeech
  ]
})
export class SobrePage {

  foto = "";

  public objetoBarCode = {
    Text: "",
    Format: ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    private tts: TextToSpeech
  ) {
  }

  ionViewDidLoad() {
    console.log(this.objetoBarCode);

  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  lerCodigoBarras() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here    
      this.objetoBarCode.Text = barcodeData.text;
      this.objetoBarCode.Format = barcodeData.format;

    }, (err) => {
      // An error occurred
      console.log(err);

    }
    );


  }

  traduzCodigoBara() {
    this.tts.speak((this.objetoBarCode.Text))
    this.tts.speak(("O Código é: "));
    this.tts.speak((this.objetoBarCode.Format))
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }
 


}
