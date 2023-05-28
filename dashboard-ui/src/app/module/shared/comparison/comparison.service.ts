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

  setComparison(regcodes: Set<number>) {
    this.comparisonSet = regcodes;
    this.updateLocalStorage();
  }

  isComparison(regcodes: Set<number>) {
    return this.areSetsEqual(regcodes, this.comparisonSet);
  }

  areSetsEqual<T>(a: Set<T>, b: Set<T>) {
    return a.size === b.size && [...a].every((value) => b.has(value));
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

  hasToCompare(): boolean {
    return this.comparisonSet.size > 0;
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
