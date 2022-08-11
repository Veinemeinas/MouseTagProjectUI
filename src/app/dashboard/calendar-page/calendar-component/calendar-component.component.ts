import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { CandidateTableApiService } from '../../candidate-table/services/candidate-table-api.service';
import {
  Candidate,
  CandidateDate,
} from '../../candidate-table/models/candidate.model';

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css'],
})
export class CalendarComponentComponent implements OnInit {
  candidates: Candidate[];

  events: any[];

  eventsMy: CandidateDate[] = [];

  options: any;

  header: any;

  constructor(private service: CandidateTableApiService) {}

  ngOnInit(): void {
    this.service.getCandidatesList().subscribe((events) => {
      this.candidates = events;
      console.log(this.candidates);
      for (let i = 0; i < this.candidates.length; i++) {
        var titlet = this.candidates[i].name + ' ' + this.candidates[i].surname;
        console.log(titlet);
        var res = this.candidates[i].willBeContacted.split('T');
        var datet = res[0];
        console.log(datet);
        this.eventsMy.push({ title: titlet, date: datet });
        console.log(this.eventsMy);
        this.calendarOptions = { events: this.eventsMy };
      }
      //this.calendarOptions = { ...this.options, ...{ events: events } };
      //{title = this.candidates[i].name + " " + this.candidates[i].surname}
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
}
