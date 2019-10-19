import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  private readonly storagePrefix = 'InDigitalTest';

  constructor() {
  }

  public set(entry: string, elem: any): void {
    localStorage.setItem(`${this.storagePrefix}_${entry}`, JSON.stringify(elem));
  }

  public get(entry: string): any {
    const item = localStorage.getItem(`${this.storagePrefix}_${entry}`);
    return item
      ? JSON.parse(item)
      : null;
  }
}
