import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page.model';
import {
  Company,
  CompanySet,
  MinimalCompanySet,
} from '../models/company.model';
import { ComparisonDatasets } from '../models/comparison.model';
import { CompanyType } from '../models/company-type.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyRepositoryService {
  constructor(private http: HttpClient) {}

  getCompanies(query: {
    search?: string;
    page?: number;
  }): Observable<Page<Company>> {
    return this.http.get<Page<Company>>('/api/users/companies', {
      params: query,
    });
  }

  getCompanyDetails(regcode: number): Observable<Company> {
    return this.http.get<Company>(`/api/users/companies/${regcode}`);
  }

  getCompanyTop(category: string, year: number): Observable<Company[]> {
    return this.http.get<Company[]>(
      `/api/users/companies/top/${category}/${year}`
    );
  }

  compareCompanies(regcodes: number[]): Observable<ComparisonDatasets> {
    return this.http.get<ComparisonDatasets>(`/api/users/companies/compare`, {
      params: {
        regcodes,
      },
    });
  }

  getCompanyTypes(): Observable<CompanyType[]> {
    return this.http.get<CompanyType[]>(`/api/users/companies/types`);
  }

  getCompanySetPage(query: { page?: number }): Observable<Page<CompanySet>> {
    return this.http.get<Page<CompanySet>>(`/api/users/companies/sets`, {
      params: query,
    });
  }

  getAllCompanySets(): Observable<MinimalCompanySet[]> {
    return this.http.get<MinimalCompanySet[]>(
      `/api/users/companies/sets/fullList`
    );
  }

  removeCompanyFromSet(setId: number, regCode: number): Observable<CompanySet> {
    return this.http.delete<CompanySet>(
      `/api/users/companies/sets/${setId}/${regCode}`
    );
  }

  deleteCompanySet(setId: number): Observable<Object> {
    return this.http.delete(`/api/users/companies/sets/${setId}`);
  }

  addCompanyToSet(setId: number, regCode: number): Observable<CompanySet> {
    return this.http.put<CompanySet>(`/api/users/companies/sets/addCompany`, {
      setId,
      regCode,
    });
  }

  createCompanySet(name: string, regCodes: number[]): Observable<CompanySet> {
    return this.http.post<CompanySet>(`/api/users/companies/sets/create`, {
      name,
      regCodes,
    });
  }
}
