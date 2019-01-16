import * as React from 'react';
import { GridCell } from '../grid-cell';
import { GridHeaderRow as GridHeaderRowBase, GridHeaderRowProps } from '../grid-header-row';
import { GridHeaderCell, GridHeaderCellProps } from './grid-header-cell';

export class GridHeaderRow<P extends GridHeaderRowProps = GridHeaderRowProps, S = {}> extends GridHeaderRowBase<P, S> {
    public render(): JSX.Element {
        const attributes = this.getAttributes();

        return (
            <tr {...attributes}>
                {this.renderCells()}
            </tr>
        );
    }

    protected get cellType(): { new (props: GridHeaderCellProps): GridCell } {
        return GridHeaderCell;
    }
}

export * from '../grid-header-row';