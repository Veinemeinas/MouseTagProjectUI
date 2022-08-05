import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from 'src/app/services/candidate-table-api.service';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css']
})
export class ShowCandidateComponent implements OnInit {

  candidateList$:Observable<any[]>;
  technologyList$:Observable<any[]>;

  // Map to display data associate with foreign keys
  technologyMap:Map<number, string> = new Map()

  constructor(private service:CandidateTableApiService) { }

  ngOnInit(): void {
    this.candidateList$ = this.service.getCandidatesList();
    this.technologyList$ = this.service.getTechnologiesList();
  }

  // Variables
  modalTitle:string =  '';
  activateAddEditCandidateComponent:boolean = false;
  candidate:any;

  modalAdd() {
    this.candidate = {
      
    }
  }

  

}
