import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { CandidateTableApiService } from '../../candidate-table/services/candidate-table-api.service';
import { Candidate } from '../../candidate-table/models/candidate.model';

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css'],
})
export class CalendarComponentComponent implements OnInit {
  candidates: Candidate[];

  events: any[];

  options: any;

  header: any;

  constructor(private service: CandidateTableApiService) {}

  ngOnInit(): void {
    this.service.getCandidatesList().subscribe((events) => {
      console.log(events);
      this.candidates = events;
      this.calendarOptions = { ...this.options, ...{ events: events } };
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2022-08-02' },
      { title: 'event 2', date: '2022-08-15' },
    ],
  };
}
