import * as React from 'react';
import { GridBodyRow } from './grid-body-row';
import { GridBody as GridBodyBase, GridBodyProps } from '../grid-body';
import { Style } from '../../common';

export class GridBody extends GridBodyBase<GridBodyProps, any> {
    protected renderMessageRow(message: string, style: Style): JSX.Element {
        return (
            <tr className={style.className}>
                <td colSpan={this.props.columns.length}>{message}</td>
            </tr>
        );
    }

    protected renderDetailsRow(/*model: any, index: number*/): JSX.Element {
        throw new Error("Method not implemented.");
    }

    public render(): JSX.Element {
        const className = this.props.style.className;

        return (
            <tbody className={className}>
                {this.renderRows()}
            </tbody>
        );
    }

    protected get rowType(): { new (): GridBodyRow } {
        return GridBodyRow;
    }
}