import { Injectable } from '@angular/core';
import { FILE_LIST } from '../../data/file.storage';
import { FileItem } from '../../models/file.item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }
  files: FileItem[] = FILE_LIST
  getAll(): FileItem[] {
    return [
      ...this.files
    ]
  }

  deleteByIndex(IDs: string[]) {
    const idSet = new Set(IDs);
    for (let i = this.files.length - 1; i >= 0; i--) {
      if (idSet.has(this.files[i].id)) {
        this.files.splice(i, 1);
      }
    }
  }
}
