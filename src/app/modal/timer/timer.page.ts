import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})

export class TimerPage implements OnInit, OnDestroy {

  private intervalId: any;
  public time: string = '00:00:00';
  
  private readonly START_HOUR = 21;
  private readonly END_HOUR = 0;

  constructor() { }

  ngOnInit() {
    this.startTimer();
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
