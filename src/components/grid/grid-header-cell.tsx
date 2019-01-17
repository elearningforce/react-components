import * as React from 'react';
import { SortDirection } from '../../infrastructure/data/common';
import { Style } from '../common';
import { GridCell, GridCellProps, GridCellStyle } from './grid-cell';
import { GridColumn } from './grid-column';
import { GridColumnFilter, GridColumnFilterProps } from './grid-column-filter';

export interface GridHeaderCellProps extends GridCellProps {
    style: GridHeaderCellStyle;
    title?: GridHeaderCellStyle;
}

export interface GridHeaderCellStyle extends GridCellStyle {
    filterIcon?: (isFiltered: boolean) => Style;
    iconBySortDirection?: { [direction: number]: Style };
    title?: Style;
}

export interface GridHeaderCellState {
    showFilter?: boolean;
}

export abstract class GridHeaderCell<
    P extends GridHeaderCellProps = GridHeaderCellProps,
    S extends GridHeaderCellState = GridHeaderCellState
    > extends GridCell<P, S> {
    public constructor(props: P, context?: any) {
        super(props, context);

        this.state = { showFilter: false } as S;
    }

    protected getAttributes(): React.HTMLAttributes<{}> {
        const field = this.props.column.props.field;
        const className = this.style.className;

        return {
            className,
            'data-column-name': field,
            onClick: this.handleClick,
            role: 'columnheader',
        } as any;
    }

    protected getSortDirection(): SortDirection {
        const field = this.props.column.props.field;
        const dataSource = this.context.grid.props.dataSource;
        const sortedBy = (dataSource.view && dataSource.view.sortedBy)
            ? dataSource.view.sortedBy.filter(x => x.field == field)
            : null;

        return (sortedBy != null)
            && (sortedBy.length == 1)
            && (sortedBy[0].field == field)
            ? sortedBy[0].direction
            : null;
    }

    protected getStyleByColumn(column: GridColumn): Style {
        return column.props.header ? column.props.header.style : null;
    }

    protected handleShowOrHideFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    protected handleSort = () => {
        const props = this.props.column.props;

        if (props.isSortable && props.field) {
            const field = this.props.column.props.field;

            if (!field) return;

            const dataSource = this.context.grid.props.dataSource;
            let sortedBy = null;

            if (dataSource.view && dataSource.view.sortedBy) {
                sortedBy = dataSource.view.sortedBy.filter(x => x.field == field);
                sortedBy = (sortedBy.length == 1) ? sortedBy[0] : null;
            }

            const direction = (sortedBy != null)
                ? ((sortedBy.direction == SortDirection.Ascending) ? SortDirection.Descending : null)
                : SortDirection.Ascending;

            if (direction) {
                dataSource.sort([{ direction, field }]);
            } else {
                dataSource.sort([]);
            }

            dataSource.dataBind();
        }
    }

    protected handleFilterContextChange() {
        if (this.state.showFilter) {
            this.forceUpdate();
        }
    }

    protected renderContent(): React.ReactNode {
        const column = this.props.column;
        const columnProps = column.props;
        const isSortable = columnProps.isSortable;
        const sortDirection = isSortable ? this.getSortDirection() : null;
        const sortIconClassName = sortDirection ? this.props.style.iconBySortDirection[sortDirection].className : null;
        const titleClassName = (this.style as GridHeaderCellStyle).title.className;
        const template = column.props.header ? column.props.header.template : null;

        return template
            ? template(column, this)
            : [
                <span className={titleClassName} onClick={this.handleSort}>
                    <span>{columnProps.title}</span>
                    {(isSortable && sortDirection) ? <i className={sortIconClassName} /> : null}
                </span>,
                this.renderFilterIcon(),
                this.state.showFilter ? this.renderFilter() : null,
            ];
    }

    protected renderFilter(): JSX.Element {
        const column = this.props.column;
        const filterContext = this.context.filterContext;
        const expression = filterContext.get(column.props.field);
        const Filter = this.filterType;

        return Filter ? <Filter column={column} expression={expression} /> : null;
    }

    protected renderFilterIcon(): React.ReactNode {
        const column = this.props.column;
        const columnProps = column.props;
        const isFilterable = columnProps.isFilterable;
        const filterContext = this.context.filterContext;
        const filterExpression = filterContext.get(columnProps.field);
        const filterIconClassName = this.props.style.filterIcon(filterExpression != null).className;

        return isFilterable
            ? <i className={filterIconClassName} onClick={this.handleShowOrHideFilter} />
            : null;
    }

    protected get filterType(): { new(props: GridColumnFilterProps): GridColumnFilter } {
        return null;
    }
}