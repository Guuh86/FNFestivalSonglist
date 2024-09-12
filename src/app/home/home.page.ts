import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { MusicPage } from '../modal/music/music.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiUrl: string = 'https://raw.githubusercontent.com/FNFestival/fnfestival.github.io/main/data/jam_tracks.json'

  data: { [key: string]: any } = {};

  public filteredItems: { key: string, value: any }[] = [];
  public ftItems: { key: string, value: any }[] = [];
  public searchQuery: string = '';

  segmentValue !: string;

  private intervalId: any;
  public time: string = '00:00:00';
  
  private readonly START_HOUR = 21;
  private readonly END_HOUR = 0;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
  ) {
    this.filterItems();
  }

  ngOnInit() {
    this.getData().subscribe(response => {
      this.data = response;
      this.ftItems = Object.entries(this.data)
        .filter(([_, value]) => value.featured === true)
        .map(([key, value]) => ({ key, value }));
    });
    this.segmentValue = 'daily';
    this.startTimer();
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  async openModal(x: any) {
    const modal = await this.modalCtrl.create({
      component: MusicPage,
      componentProps: {
        data: x
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  filterItems() {
    if (this.searchQuery.trim() === '') {
      this.filteredItems = [];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredItems = Object.keys(this.data)
        .filter(key => {
          const title = String(this.data[key].title).toLowerCase();
          return title.includes(query);
        })
        .map(key => ({ key, value: this.data[key] }));
    }
  }

  changeDaily(){
    this.segmentValue = 'daily';
  }

  changeNews(){
    this.segmentValue = 'news';    
  }

  changeAll(){
    this.segmentValue = 'all';    
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startTimer() {
    this.updateTimer();

    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private updateTimer() {
    const now = new Date();
    const targetHour = this.START_HOUR;
    const targetDate = new Date();
    targetDate.setHours(targetHour, 0, 0, 0);

    if (now.getHours() < targetHour) {
      targetDate.setDate(targetDate.getDate() - 1);
    }

    const timeDifference = targetDate.getTime() - now.getTime();
    if (timeDifference < 0) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const remainingTime = targetDate.getTime() - now.getTime();
    if (remainingTime <= 0) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const hours = Math.floor(remainingTime / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(remainingTime / (1000 * 60)) % 60;
    const seconds = Math.floor(remainingTime / 1000) % 60;

    this.time = [
      this.pad(hours),
      this.pad(minutes),
      this.pad(seconds),
    ].join(':');

    if (this.time === '00:00:00') {
      targetDate.setDate(targetDate.getDate() + 1);
    }
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
