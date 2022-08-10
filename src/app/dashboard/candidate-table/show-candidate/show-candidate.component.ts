import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css'],
})
export class ShowCandidateComponent implements OnInit {
  customers: Customer[];

  representatives: Representative[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  candidateList$: Observable<any[]>;
  technologyList$: Observable<any[]>;

  // Map to display data associate with foreign keys
  technologyMap: Map<number, string> = new Map();

  constructor(
    private service: CandidateTableApiService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.candidateList$ = this.service.getCandidatesList();
    this.technologyList$ = this.service.getTechnologiesList();

    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach((customer) => customer.date);
    });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];
  }

  // Variables
  modalTitle: string = '';
  activateAddEditCandidateComponent: boolean = false;
  candidate: any;

  modalAdd() {
    this.candidate = {};
  }
}
