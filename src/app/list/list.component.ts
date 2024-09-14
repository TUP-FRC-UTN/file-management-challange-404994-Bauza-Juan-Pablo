import { Component, inject } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ListService } from '../services/list.service';
import { FileItem } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormComponent, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private listService = inject(ListService);

  listItems: FileItem[] = this.getAllItems();
  newForm: boolean = false;

  getAllItems() {
    return this.listService.getAll().sort((a, b) => {
      // Ordenar por tipo
      if (a.type !== b.type) {
        return a.type - b.type; //Folder enum 0 y file enum 1
      }
      // Orden alfabetico
      return a.name.localeCompare(b.name);
    });
  }

  deleteSelected() {
    const selectedIds: string[] = [];
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.form-check-input:checked');
    checkboxes.forEach((checkbox) => {
      selectedIds.push(checkbox.value);
    });
    console.log('Selected IDs:', selectedIds);
    if (selectedIds.length > 1) {
      const confirmation = window.confirm('¿Está seguro de que desea eliminar los elementos seleccionados?');
      if (confirmation) {
        console.log('Deleted IDs:', selectedIds);
        this.listService.deleteByIndex(selectedIds);
        this.listItems = this.getAllItems();
      }
    }
    else {
      console.log('Deleted ID:', selectedIds);
      this.listService.deleteByIndex(selectedIds);
      this.listItems = this.getAllItems();
    }
  }

  showForm(){
    this.newForm = true;
  }


}
