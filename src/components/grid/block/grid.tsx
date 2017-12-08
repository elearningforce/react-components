import * as React from 'react';
import { GridBody } from './grid-body';
import { GridHeader } from './grid-header';
import { Grid as GridBase, GridProps, GridState } from '../grid';

export abstract class Grid<P extends GridProps = GridProps, S extends GridState = GridState> extends GridBase<P, S> {
    public render(): JSX.Element {
        const className = this.props.style.className;

        return (
            <div className={className}>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }

    protected get bodyType(): { new (): GridBody } {
        return GridBody;
    }

    protected get headerType(): { new (): GridHeader } {
        return GridHeader;
    }
}