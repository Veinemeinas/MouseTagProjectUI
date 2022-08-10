import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { Candidate } from '../models/candidate.model';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css'],
})
export class ShowCandidateComponent implements OnInit {
  candidates: Candidate[];

  candidate: Candidate;

  loading: boolean = true;

  //candidateList$: Observable<any[]>;
  technologyList$: Observable<any[]>;

  // Map to display data associate with foreign keys
  technologyMap: Map<number, string> = new Map();

  constructor(private service: CandidateTableApiService) {}

  ngOnInit(): void {
    this.technologyList$ = this.service.getTechnologiesList();

    this.service.getCandidatesList().subscribe((data) => {
      console.log(data);
      this.candidates = data;
      this.candidates.forEach((candidate) => candidate.whenWasContacted);

      this.loading = false;
    });

    // Variables
    //modalTitle: string = '';
    //activateAddEditCandidateComponent: boolean = false;
    //candidate: any;

    // modalAdd() {
    //    this.candidate = {};
    // }
  }
}
