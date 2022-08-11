import { Component, Input, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { SelectItem, MessageService } from 'primeng/api';

import { FormGroup } from '@angular/forms';
import { AddCandidate, Candidate } from '../models/candidate.model';
import { NgForm } from '@angular/forms';
import { ShowCandidateComponent } from './../show-candidate/show-candidate.component';

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css'],
})
export class AddEditCandidateComponent implements OnInit {
  candidates: Candidate[]
  candidate: Candidate;
  addCandidate: AddCandidate;

  candidateForm!: FormGroup;

  checked: boolean = true;

  contactedDate: Date;

  meetDate: Date;

  foundIt: boolean = false;
  empty: boolean = false;

  candidateList$: Observable<any[]>;
  technologyList$: Observable<any[]>;

  technologyOptions: SelectItem<number>[];

  selectedTechnologies: SelectItem[];

  constructor(
    private service: CandidateTableApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.service.getTechnologiesList().subscribe((response: any[]) => {
      this.technologyOptions = response.map((x) => {
        return { value: x.id, label: x.technologyName };
      });  
    });

    this.service.getCandidatesList().subscribe((data) => {
      this.candidates = data;
    });

    this.resetForm();
  }

  resetForm(AddCandidateForm?: NgForm) {
    if (AddCandidateForm != null) AddCandidateForm.reset();
    this.candidate = {
      whenWasContacted: [],
      name: '',
      surname: '',
      linkedin: '',
      comment: '',
      available: true,
      technologyIds: [],
      willBeContacted: '',
    };
    this.addCandidate = {
      whenWasContacted: new Date(Date.now()),
      name: '',
      surname: '',
      linkedin: '',
      comment: '',
      available: true,
      technologyIds: [],
      willBeContacted: new Date(Date.now()),
    }
  }

  AddCandidate(AddCandidateForm: NgForm) {
    this.empty = false;
    this.foundIt = false;
    if (
      this.addCandidate.name == '' ||
      this.addCandidate.surname == '' ||
      this.addCandidate.name == undefined ||
      this.addCandidate.surname == undefined
    ) {
      this.empty = true;
      }
    if (!this.empty) {
      for (var i = 0; i < this.candidates.length; i++) {
        if (
          this.candidates[i].name.toLowerCase() ==
          this.addCandidate.name.toLowerCase() &&
          this.candidates[i].surname.toLowerCase() ==
          this.addCandidate.surname.toLowerCase()
        ) 
        {
          this.empty = false;
          this.foundIt = true;
        }
      }
    }
      if (!this.empty && !this.foundIt) {
        console.log(this.addCandidate);
    this.service.addCan(this.addCandidate).subscribe((response: any) => {
      //this.comp.refreshCandidateAdd();
      // this.messageService.add({
      //   key: 'myKey1',
      //   severity: 'success',
      //   summary: 'Kandidatas sėkmingai pridėtas!',
      // });
      this.resetForm(AddCandidateForm);
      // }
    });
  }
}
}
