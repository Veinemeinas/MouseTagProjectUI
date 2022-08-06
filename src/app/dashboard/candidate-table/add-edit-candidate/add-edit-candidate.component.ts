import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css'],
})
export class AddEditCandidateComponent implements OnInit {
  candidateList$: Observable<any[]>;
  technologyList$: Observable<any[]>;

  constructor(private service: CandidateTableApiService) {}

  ngOnInit(): void {
    this.technologyList$ = this.service.getTechnologiesList();
  }
}
