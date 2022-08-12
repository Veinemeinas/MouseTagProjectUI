import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import {
  AddCandidate,
  Candidate,
  DeleteCandidate,
  UpdateCandidate,
} from '../models/candidate.model';
import { FilterService, MessageService, SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css'],
})
export class ShowCandidateComponent implements OnInit {
  addUser: boolean = true;

  role = this.getUserProfileRole();

  technologyFilterName = 'technology-equals';

  @ViewChild('dt') table: Table;

  candidates: Candidate[];

  editDialog: boolean = false;

  addDialog: boolean = false;

  initAddTechDialog: boolean = false;

  initUplDialog: boolean = false;

  totalRecords: number;

  candidate: Candidate;

  foundIt: boolean = false;
  emptyName: boolean = false;
  emptySurname: boolean = false;

  updateCandidate: UpdateCandidate;

  addCandidateModel: AddCandidate;

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
    private filterService: FilterService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.checkRole();
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
      whenWasContacted: new Date(Date.now()),
      name: '',
      surname: '',
      linkedin: '',
      comment: '',
      available: true,
      technologyIds: [],
      willBeContacted: new Date(Date.now()),
    };

    this.addCandidateModel = {
      whenWasContacted: new Date(Date.now()),
      name: '',
      surname: '',
      linkedin: '',
      comment: '',
      available: true,
      technologyIds: [],
      willBeContacted: new Date(Date.now()),
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

  refreshCandidate(message: string) {
    this.messageService.add({
      key: 'myKey1',
      severity: 'success',
      summary: message,
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
      summary: 'Kandidatas sėkmingai pridėtas',
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
      message: 'Ar norite ištrinti kandidatą ' + candidates.name + '?',
      header: 'Patvirtinimas',
      key: 'account',
      accept: () => {
        this.service
          .deleteCandidate(candidates.id)
          .subscribe((res) => this.refreshCandidate('Kandidatas ištrintas'));
      },
    });
  }

  editCandidate(
    candidates: Candidate,
    updateCandidate: UpdateCandidate,
    id: number,
    technologies: Array<any>
  ) {
    this.updateCandidate = {
      id: id,
      whenWasContacted: new Date(
        candidates.whenWasContacted[candidates.whenWasContacted.length - 1]
      ),
      name: candidates.name,
      surname: candidates.surname,
      linkedin: candidates.linkedin,
      comment: candidates.comment,
      available: true,
      technologyIds: technologies.map((a) => a.id),
      willBeContacted: new Date(candidates.willBeContacted),
    };
    this.editDialog = true;
  }

  addCandidate() {
    this.addDialog = true;
  }

  addTechDial() {
    this.initAddTechDialog = true;
  }

  uploadDial() {
    this.initUplDialog = true;
  }

  saveNewCandidate(candidate: AddCandidate) {
    this.emptyName = false;
    this.emptySurname = false;
    this.foundIt = false;

    if (candidate.name == '') {
      this.emptyName = true;
    }
    if (candidate.surname == '') {
      this.emptySurname = true;
    }
    if (!this.emptyName && !this.emptySurname) {
      for (var i = 0; i < this.candidates.length; i++) {
        if (
          this.candidates[i].name.toLowerCase() ==
            candidate.name.toLowerCase() &&
          this.candidates[i].surname.toLowerCase() ==
            candidate.surname.toLowerCase()
        ) {
          this.foundIt = true;
        }
      }
    }
    if (!this.emptyName && !this.emptySurname && !this.foundIt) {
      this.service
        .addCandidate(candidate)
        .subscribe((res) => this.refreshCandidateAdd());
      this.addDialog = false;
    }
  }

  saveCandidate() {
    this.service
      .updateCandidate(this.updateCandidate.id, this.updateCandidate)
      .subscribe((res) => this.refreshCandidate('Kandidatas atnaujintas'));
    this.editDialog = false;
  }

  getUserProfileRole() {
    var token = JSON.stringify(localStorage.getItem('token'));
    console.log(this.jwtHelper.decodeToken(token));
    const tokendec = this.jwtHelper.decodeToken(token);
    const role =
      tokendec['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }

  checkRole() {
    this.addUser = true;
    if (this.role == 'User') {
      this.addUser = false;
    }
  }
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
