import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { Candidate, DeleteCandidate } from '../models/candidate.model';
import { MessageService, SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

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

  constructor(
    private service: CandidateTableApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.technologyList$ = this.service.getTechnologiesList();

    this.service.getCandidatesList().subscribe((data) => {
      this.candidates = data;
      this.candidates.forEach((candidate) => candidate.whenWasContacted);
      //this.totalRecords = res.totalRecords;
      this.loading = false;
    });

    this.service.getTechnologiesList().subscribe((response: any[]) => {
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

  refreshCandidate() {
    this.messageService.add({
      key: 'myKey1',
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    }),
      this.service.getCandidatesList().subscribe((data) => {
        this.candidates = data;
        this.candidates.forEach((candidate) => candidate.whenWasContacted);
        //this.totalRecords = res.totalRecords;
        this.loading = false;
      });
  }

  deleteCandidate(candidates: DeleteCandidate) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + candidates.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      key: 'account',
      accept: () => {
        this.service
          .deleteCandidate(candidates.id)
          .subscribe((res) => this.refreshCandidate());
      },
    });
  }

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
