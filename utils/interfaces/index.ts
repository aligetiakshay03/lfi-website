export interface IcontactusDetails {
  name: string;
  phoneNo: number | null;
  email: string;
  service: string;
  message: string;
}

export type IContactusDetailsKeys = keyof IcontactusDetails;

export interface IcontactUsInputs {
  label: string;
  type: string;
  name: IContactusDetailsKeys;
  placeHolder: string;
  required: boolean;
}
export interface IOdooContactDetails {
  name: string;
  phoneNo: string;
  email: string;
  industry: string;
  companySize: string;
  timeline: string;
  message: string;
}

export type IOdooContactDetailsKeys = keyof IOdooContactDetails;

export interface IOdooContactInputs {
  label: string;
  type: string;
  name: IOdooContactDetailsKeys;
  placeHolder: string;
  required: boolean;
  options?: Array<{ label: string; value: string }>;
}
