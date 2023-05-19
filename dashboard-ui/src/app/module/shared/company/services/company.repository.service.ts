import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page.model';
import { Company } from '../models/company.model';
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
}
