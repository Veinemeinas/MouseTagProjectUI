import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { Candidate } from '../models/candidate.model';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css'],
})
export class ShowCandidateComponent implements OnInit {
  candidates: Candidate[];

  totalRecords: number;

  candidate: Candidate;

  loading: boolean = true;

  //candidateList$: Observable<any[]>;
  technologyList$: Observable<any[]>;

  selectAll: boolean = false;

  technologyOptions: SelectItem<number>[];

  // Map to display data associate with foreign keys
  technologyMap: Map<number, string> = new Map();

  constructor(private service: CandidateTableApiService) {}

  ngOnInit(): void {
    this.technologyList$ = this.service.getTechnologiesList();

    this.service.getCandidatesList().subscribe((data) => {
      console.log(data);
      this.candidates = data;
      this.candidates.forEach((candidate) => candidate.whenWasContacted);
      //this.totalRecords = res.totalRecords;
      this.loading = false;
    });

    this.service.getTechnologiesList().subscribe((response: any[]) => {
      console.log(response);
      this.technologyOptions = response.map((x) => {
        return { value: x.id, label: x.technologyName };
      });
    });

    // Variables
    //modalTitle: string = '';
    //activateAddEditCandidateComponent: boolean = false;
    //candidate: any;

    // modalAdd() {
    //    this.candidate = {};
    // }
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.technologyOptions = value;
  }

  // deleteProduct(candidates: Candidate) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + candidates.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.candidates = this.candidates.filter((val) => val.id !== candidate.id);
  //       this.candidate = {};
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  //}

  // onSelectAllChange(event) {
  //   const checked = event.checked;

  //   if (checked) {
  //     this.service.getCandidatesList().subscribe((data) => {
  //       console.log(data);
  //       this.candidates = data;
  //       this.candidates.forEach((candidate) => candidate.whenWasContacted);
  //       this.selectAll = true;
  //       this.loading = false;
  //     });
  //   } else {
  //     this.technologyOptions = [];
  //     this.selectAll = false;
  //   }
  // }
}
