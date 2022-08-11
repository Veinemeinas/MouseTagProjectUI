import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css'],
})
export class CalendarComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  calendarOptions: CalendarOptions = {
    //initialView: 'dayGridMonth',
  };
}
