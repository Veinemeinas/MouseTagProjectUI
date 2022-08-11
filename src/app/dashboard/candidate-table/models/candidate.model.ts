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

export class AddCandidate {
  whenWasContacted: Date;
  name: string;
  surname: string;
  linkedin: string;
  comment: string;
  available: boolean = true;
  technologyIds: number[];
  willBeContacted: Date;
}

export class DeleteCandidate {
  id: number;
  name: string;
}

export class UpdateCandidate {
  id: number;
  whenWasContacted: string[];
  name: string;
  surname: string;
  linkedin: string;
  comment: string;
  available: boolean = true;
  technologyIds: number[];
  willBeContacted: string;
}
