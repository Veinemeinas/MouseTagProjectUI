import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { PrimeNGConfig, SelectItemGroup, SelectItem } from 'primeng/api';
import { ToastInjector } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.service.getTechnologiesList().subscribe((response: any[]) => {
      console.log(response);
      this.technologyOptions = response.map((x) => {
        return { value: x.id, label: x.technologyName };
      });
    });

    this.resetForm();
  }

  resetForm(userRegistrationForm?: NgForm) {
    if (userRegistrationForm != null) userRegistrationForm.reset();
    this.candidate = {
      whenWasContacted: [''],
      name: '',
      surname: '',
      linkedIn: '',
      comments: '',
      available: true,
      technologyIds: [],
      willBeContacted: '',
    };
  }

  AddCandidate(AddCandidateForm: NgForm) {
    console.log(this.candidate);
    this.service.addCan(this.candidate).subscribe((data: any) => {
      if (data.Succeded == true) {
        this.resetForm(AddCandidateForm);
      }
    });
  }
}
