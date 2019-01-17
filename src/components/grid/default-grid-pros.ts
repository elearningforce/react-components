import { GridProps } from './grid';

export const DefaultGridProps: Partial<GridProps> = {
    autoBind: true,
    messages: {
        loading: '',
        noItems: '',
    },
    selectionMode: 0,
    style: {
        className: '',
        body: {
            className: '',
            row: {
                className: '',
                cell: {
                    className: '',
                },
                ifSelected: {
                    className: '',
                },
            },
        },
        footer: {
            className: '',
            row: {
                className: '',
                cell: {
                    className: '',
                },
            },
        },
        header: {
            row: {
                className: '',
                cell: {
                    className: '',
                    filterIcon: (isFiltered: boolean) => ({ className: '' }),
                    iconBySortDirection: {
                        [1]: { className: '' },
                        [2]: { className: '' },
                    },
                    title: {
                        className: '',
                    },
                },
            },
        },
    },
};