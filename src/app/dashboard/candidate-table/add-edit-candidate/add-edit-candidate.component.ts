import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { SelectItem, MessageService } from 'primeng/api';

import { FormGroup } from '@angular/forms';
import { Candidate } from '../models/candidate.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css'],
})
export class AddEditCandidateComponent implements OnInit {
  candidate: Candidate;

  candidateForm!: FormGroup;

  checked: boolean = true;

  contactedDate: Date;

  meetDate: Date;

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
  }

  AddCandidate(AddCandidateForm: NgForm) {
    this.service.addCan(this.candidate).subscribe((response: any) => {
      this.messageService.add({
        key: 'myKey1',
        severity: 'success',
        summary: 'Kandidatas sėkmingai pridėtas!',
      });
      // if (response.status == 200) {
      //   this.resetForm(AddCandidateForm);
      this.resetForm(AddCandidateForm);
      // }
    });
  }
}
