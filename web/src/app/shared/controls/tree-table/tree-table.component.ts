import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dataTable;

  // START : DataSource
  dataSource: any;
  @Input()
  public set source(_source: any[]) {
    this.dataSource = _source;
  }

  public get source(): any[] {
    return this.dataSource;
  }
  // END : DataSource

  selectedNodes: TreeNode[];
  @Input()
  public set selected(_selectedNodes: any[]) {
    this.selectedNodes = _selectedNodes;
  }

  public get selected(): any[] {
    return this.selectedNodes;
  }

  @Output()
  public selectionChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  cols: any[];
  @Input()
  public set column(_cols: any[]) {
    this.cols = _cols;
  }

  public get column(): any[] {
    return this.cols;
  }

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
  }

  onNodeSelectionChanged(record: any) {
    this.selectionChangedEvent.emit(this.selectedNodes);
  }

}
