import * as React from 'react';
import { ObjectHelper } from '../../infrastructure/helpers/object-helper';
import { Style } from '../common';
import { GridBodyRowProps } from './grid-body-row';
import { GridCell, GridCellProps } from './grid-cell';
import { GridColumn } from './grid-column';

export interface GridBodyCellProps extends GridCellProps {
    rowProps: GridBodyRowProps;
}

export abstract class GridBodyCell<P extends GridBodyCellProps = GridBodyCellProps, S = {}> extends GridCell<P, S> {
    protected getAttributes(): React.HTMLAttributes<{}> {
        const content = this.renderContent();
        const className = this.style.className;
        const field = this.props.column ? this.props.column.props.field : '';
        const title = ObjectHelper.isString(content) ? content : '';

        return {
            className,
            'data-column-name': field,
            onClick: this.handleClick,
            role: 'gridcell',
            title,
        } as any;
    }

    protected getStyleByColumn(column: GridColumn): Style {
        return column.props.body ? column.props.body.style : null;
    }

    protected getValue(): any {
        const item = this.props.rowProps.item;
        const field = this.props.column.props.field;

        return (item && field)
            ? this.context.grid.props.dataSource.fieldAccessor.getValue(item, field)
            : null;
    }

    protected renderContent(): React.ReactNode {
        if (this.props.children) {
            return this.props.children;
        }

        const { column, rowProps } = this.props;
        const { body } = column.props;
        const item = rowProps.item;
        const value = this.getValue();
        const template = (body && body.template)
            ? body.template
            : (item, column, cell) => (value instanceof Array ? value.join(', ') : value);

        return template(item, column, this);
    }
}