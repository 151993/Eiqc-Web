import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatrixColumn } from 'src/app/model/matrix-table/mstrix-column.model';
import { MatrixRow } from 'src/app/model/matrix-table/matrix-row.model';

@Component({
  selector: 'app-matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.css']
})
export class MatrixTableComponent implements OnInit {

  @Input() rows: MatrixRow[];
  @Input() cols: MatrixColumn[];
  @Input() groups: Record<number, Record<number, number>>;
  @Input() badges: Record<number, Record<number, number>>;
  @Input() icons: Record<number, Record<number, string>>;

  @Output() addEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();
  @Output() clickEvent = new EventEmitter<{ rowId: number, colId: number }>();
  @Output() paginateEvent = new EventEmitter<Event>();

  constructor(

  ) { }

  ngOnInit(): void {

  }

  /** Rreturns the value for a given group cell
   * @param {number} rowId - row id
   * @param {number} groupId - group id
  */
  getGroupValue(rowId: number, groupId: number): string {
    const ratio = this.groups
      && this.groups[rowId]
      && this.groups[rowId][groupId];
    if (ratio == null) {
      return '';
    }
    return ratio + '%';
  }

  /** returns icon for a given cell
   * @param {number} rowId - row id
   * @param {number} colId - column id
  */
  getIcon(rowId: number, colId: number): string {
    return this.icons[rowId] && this.icons[rowId][colId] || '';
  }

  /** returns badge value a for given cell
   * @param {number} rowId - row id
   * @param {number} colId - column id
  */
  getBadgeValue(rowId: number, colId: number): number {
    return this.badges[rowId]
      && this.badges[rowId][colId];
  }

  /** Expands group
   * @param {number} groupId - group id
  */
  expandGroup(groupId: number): void {
    this.cols.map(
      (e: MatrixColumn) => {
        if (e.groupId === groupId) {
          e.groupExpanded = !e.groupExpanded;
        }
      }
    );
  }

  /** Emits when edit button is clicked
   * @param {number} rowId - row id
  */
  editData(rowId: number): void {
    this.editEvent.emit(rowId);
  }

  /** Emits when add button is clicked
   * @param {number} rowId - row id
  */
  addData(rowId: number): void {
    this.addEvent.emit(rowId);
  }

  /** Emits when cell icon is clicked
   * @param {number} rowId - row id
   * @param {number} colId - column id
  */
  clickCell(rowId: number, cellId: number): void {
    this.clickEvent.emit({ rowId: rowId, colId: cellId });
  }

  /** Emits on pagination
   * @returns {number} rowId - row id
   * @returns {number} colId - column id
  */
  paginate(event: Event): void {
    this.paginateEvent.emit(event);
  }

}
