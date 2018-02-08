import * as React from 'react';
import { GridColumn, GridColumnProps } from './grid-column';
import { GridComponent } from './grid-component';
import { GridHeaderRow, GridHeaderRowStyle } from './grid-header-row';
import { Style } from '../common';
import { DataSource } from '../../infrastructure/data/data-source';

export interface GridHeaderProps {
    columns: GridColumn<GridColumnProps>[];
    dataSource: DataSource<any>;
    style: GridHeaderStyle;

    onCellClick: (event: React.MouseEvent<any>, sender: any) => void;
    onRowClick: (event: React.MouseEvent<any>, sender: any) => void;
}

export interface GridHeaderStyle extends Style {
    row: GridHeaderRowStyle;
}

export abstract class GridHeader<P extends GridHeaderProps = GridHeaderProps, S = any> extends GridComponent<P, S> {
    protected renderRows(): JSX.Element[] {
        const Row = this.rowType;
        const rowStyle = this.props.style.row;

        return [<Row {...this.props} index={0} key={0} style={rowStyle} />];
    }

    protected abstract get rowType(): { new(): GridHeaderRow };
}