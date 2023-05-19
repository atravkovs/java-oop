import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {
  private comparisonSet: Set<number> = new Set();

  constructor() {}

  getRegcodes(): number[] {
    return [...this.comparisonSet];
  }

  addForComparison(regcode: number) {
    this.comparisonSet.add(regcode);
    this.updateLocalStorage();
  }

  removeFromComparison(regcode: number) {
    this.comparisonSet.delete(regcode);
    this.updateLocalStorage();
  }

  hasInComparison(regcode: number): boolean {
    return this.comparisonSet.has(regcode);
  }

  clear() {
    this.comparisonSet.clear();
    this.updateLocalStorage();
  }

  initialize() {
    this.comparisonSet = new Set(
      JSON.parse(localStorage.getItem('comparisonSet') ?? '[]')
    );
  }

  private updateLocalStorage() {
    localStorage.setItem(
      'comparisonSet',
      JSON.stringify([...this.comparisonSet])
    );
  }
}
