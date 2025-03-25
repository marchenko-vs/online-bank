export interface PostUser {
  firstName: string;
  lastName: string;
  patronymic?: string | null;
  birthDate: string;
  email: string;
  phoneNum?: string | null;
  password: string;
  country: string;
  region: string;
  city?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  postalCode: string;
  idType: string;
  idSeries?: string | null;
  idNumber: string;
  idIssueDate: string;
  idValidityDate: string;
  departmentCode: string;
}

export interface PatchUser {
  firstName?: string | null,
  lastName?: string | null,
  patronymic?: string | null,
  birthDate?: string | null,
  email?: string | null,
  phoneNum?: string | null,
  oldPassword: string,
  newPassword?: string | null,
  country?: string | null,
  region?: string | null,
  city?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  postalCode?: string | null,
  idType?: string | null,
  idSeries?: string | null,
  idNumber?: string | null,
  idIssueDate?: string | null,
  idValidityDate?: string | null,
  departmentCode?: string | null
}

export interface GetUser {
  id: number,
  firstName: string,
  lastName: string,
  patronymic?: string | null,
  birthDate: string,
  email: string,
  phoneNum?: string | null,
  password: string,
  country: string,
  region: string,
  city?: string | null,
  addressLine1: string,
  addressLine2?: string | null,
  postalCode: string,
  idType: string,
  idSeries?: string | null,
  idNumber: string,
  idIssueDate: string,
  idValidityDate: string,
  departmentCode: string
}

export interface LoginUser {
  email: string,
  password: string
}

export default PostUser;
