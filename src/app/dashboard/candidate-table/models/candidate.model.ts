export class Candidate {
  whenWasContacted: string[];
  name: string;
  surname: string;
  linkedin: string;
  comment: string;
  available: boolean = true;
  technologyIds: number[];
  willBeContacted: string;
}

export class DeleteCandidate {
  id: number;
  name: string;
}
