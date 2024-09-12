import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  data: any;
  apiValue: number = 0;
  progressBars = new Array(7).fill(0);
  currentFilledBars: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private nav: NavParams
  ) { }

  ngOnInit() {
    this.data = this.nav.get('data');
    console.log(this.data);
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    return this.modalCtrl.dismiss();
  }

  getProgressBarDrums(index: number): string {
    const difficulty = this.data.value.difficulties.drums;

    if (index < (difficulty + 1)) {
      if (difficulty <= 1) {
        return 'success';
      } else if (difficulty <= 3) {
        return 'warning';
      } else if (difficulty <= 5) {
        return 'danger';
      } else {
        return 'danger';
      }
    } else {
      return 'transparent'; // Cor para barras não preenchidas
    }
  }

  getProgressBarBass(index: number): string {
    const difficulty = this.data.value.difficulties.bass;

    if (index < (difficulty + 1)) {
      if (difficulty <= 1) {
        return 'success';
      } else if (difficulty <= 3) {
        return 'warning';
      } else if (difficulty <= 5) {
        return 'danger';
      } else {
        return 'danger';
      }
    } else {
      return 'transparent'; // Cor para barras não preenchidas
    }
  }

  getProgressBarVocals(index: number): string {
    const difficulty = this.data.value.difficulties.vocals;

    if (index < (difficulty + 1)) {
      if (difficulty <= 1) {
        return 'success';
      } else if (difficulty <= 3) {
        return 'warning';
      } else if (difficulty <= 5) {
        return 'danger';
      } else {
        return 'danger';
      }
    } else {
      return 'transparent'; // Cor para barras não preenchidas
    }
  }

  getProgressBarGuitar(index: number): string {
    const difficulty = this.data.value.difficulties.guitar;

    if (index < (difficulty + 1)) {
      if (difficulty <= 1) {
        return 'success';
      } else if (difficulty <= 3) {
        return 'warning';
      } else if (difficulty <= 5) {
        return 'orange';
      } else {
        return 'danger';
      }
    } else {
      return 'transparent'; // Cor para barras não preenchidas
    }
  }
}
