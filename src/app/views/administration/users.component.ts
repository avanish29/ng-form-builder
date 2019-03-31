import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularGridInstance, Column, Editors, FieldType, Formatters, GridOption, GridService, OnEventArgs } from 'angular-slickgrid';

import { User } from '../../models';
import { UserService } from '../../services';

@Component({ templateUrl: 'users.component.html' })
export class UsersComponent implements OnInit, OnDestroy {
  angularGrid: AngularGridInstance;
  grid: any;
  gridService: GridService;
  dataView: any;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  updatedObject: any;

  constructor(private userService: UserService) { }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.dataView = angularGrid.dataView;
    this.grid = angularGrid.slickGrid;
    this.gridService = angularGrid.gridService;
  }

  ngOnInit() {
    this.columnDefinitions = [
      {
        id: 'delete',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.deleteIcon,
        minWidth: 30,
        maxWidth: 30,
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log(args);
          if (confirm('Are you sure?')) {
            this.angularGrid.gridService.deleteDataGridItemById(args.dataContext.id);
          }
        }
      },
      {
        id: 'title', name: 'Title', field: 'title',
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.longText
        }
      },
      {
        id: 'duration', name: 'Duration (days)', field: 'duration',
        sortable: true,
        type: FieldType.number,
        editor: {
          model: Editors.text
        },
        onCellChange: (e: Event, args: OnEventArgs) => {
          alert('onCellChange directly attached to the column definition');
          console.log(args);
        }
      },
      {
        id: 'complete', name: '% Complete', field: 'percentComplete',
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        editor: {
          model: Editors.integer
        }
      },
      {
        id: 'start', name: 'Start', field: 'start',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
        /*
        editor: {
          model: Editors.date
        }
        */
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
        formatter: Formatters.dateIso, sortable: true,
        type: FieldType.date
      },
      {
        id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
        formatter: Formatters.checkmark,
        type: FieldType.number,
        editor: {
          model: Editors.checkbox
        }
      }
    ];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      editable: true,
      enableColumnPicker: true,
      enableCellNavigation: true,
      enableRowSelection: true
    };

    // mock a dataset
    const mockedDataset = [];
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      mockedDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0)
      };
    }
    this.dataset = mockedDataset;
  }

  addNewItem() {
    const newId = this.dataset.length;
    const randomYear = 2000 + Math.floor(Math.random() * 10);
    const randomMonth = Math.floor(Math.random() * 11);
    const randomDay = Math.floor((Math.random() * 29));
    const randomPercent = Math.round(Math.random() * 100);

    const newItem = {
      id: newId,
      title: 'Task ' + newId,
      duration: Math.round(Math.random() * 100) + '',
      percentComplete: randomPercent,
      percentCompleteNumber: randomPercent,
      start: new Date(randomYear, randomMonth, randomDay),
      finish: new Date(randomYear, (randomMonth + 2), randomDay),
      effortDriven: true
    };
    this.angularGrid.gridService.addItemToDatagrid(newItem);
  }

  highlighFifthRow() {
    this.angularGrid.gridService.highlightRow(4, 1500);
  }

  changeDurationBackgroundColor() {
    this.dataView.getItemMetadata = this.updateItemMetadataForDurationOver50(this.dataView.getItemMetadata);
    this.grid.invalidate();
    this.grid.render();
  }

  updateItemMetadataForDurationOver50(previousItemMetadata: any) {
    const newCssClass = 'duration-bg';

    return (rowNumber: number) => {
      const item = this.dataView.getItem(rowNumber);
      let meta = {
        cssClasses: ''
      };
      if (typeof previousItemMetadata === 'object') {
        meta = previousItemMetadata(rowNumber);
      }

      if (meta && item && item.duration) {
        const duration = +item.duration;
        if (duration > 50) {
          meta.cssClasses = (meta.cssClasses || '') + ' ' + newCssClass;
        }
      }

      return meta;
    };
  }

  updateSecondItem() {
    const updatedItem = this.angularGrid.gridService.getDataItemByRowNumber(1);
    updatedItem.duration = Math.round(Math.random() * 100);
    this.angularGrid.gridService.updateDataGridItem(updatedItem);
  }

  ngOnDestroy() { }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.dataset = users;
    });
  }

}
