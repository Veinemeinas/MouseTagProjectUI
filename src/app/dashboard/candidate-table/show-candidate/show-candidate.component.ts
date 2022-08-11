import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { Candidate, DeleteCandidate, UpdateCandidate } from '../models/candidate.model';
import { FilterService, MessageService, SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css'],
})
export class ShowCandidateComponent implements OnInit {
  technologyFilterName = 'technology-equals';

  @ViewChild('dt') table: Table;

  candidates: Candidate[];

  editDialog: boolean = false;

  totalRecords: number;

  candidate: Candidate;

  updateCandidate: UpdateCandidate;

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
    private confirmationService: ConfirmationService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.register(
      this.technologyFilterName,
      (value: any[], filter: number[]) => {
        console.log(filter);
        console.log(value);
        return value.some((v) => filter.some((f) => f === v.id));
      }
    );

    this.updateCandidate = {
      id: 0,
      whenWasContacted: [],
      name: '',
      surname: '',
      linkedin: '',
      comment: '',
      available: true,
      technologyIds: [],
      willBeContacted: '',
    };

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
  }

  filterNames(event: any) {
    this.table.filterGlobal(event.target.value, 'contains');
  }
  filterTechnologies(event: any) {
    this.table.filter(event.value, 'technologies', 'technology-equals');
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
        this.loading = false;
      });
  }

  refreshCandidateAdd() {
    this.messageService.add({
      key: 'myKey1',
      severity: 'success',
      summary: 'Sėkmingai',
      detail: 'Kandidatas sėkmingai pridėtas',
      life: 3000,
    }),
      this.service.getCandidatesList().subscribe((data) => {
        this.candidates = data;
        this.candidates.forEach((candidate) => candidate.whenWasContacted);
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

  editCandidate(candidates: UpdateCandidate) {
    this.updateCandidate = candidates;
    this.editDialog = true;
    
  }

  saveCandidate()
  {
    console.log(this.candidate);
    this.confirmationService.confirm({
      message: 'Are you sure you want to update ' + this.updateCandidate.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      key: 'account',
      accept: () => {
        this.service.updateCandidate(this.updateCandidate.id, this.updateCandidate)
          .subscribe((res) => this.refreshCandidate());
          this.editDialog = false;
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
