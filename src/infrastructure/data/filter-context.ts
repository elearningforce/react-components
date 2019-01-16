import { Event } from '../event';
import { ConditionalExpressionBuilder } from '../expressions/conditional-expression-builder';
import { ConditionalExpression } from '../expressions/expression';

export class FilterContext {
    private _expressionByKey: { [key: string]: ConditionalExpression };
    private _onChange: Event<ConditionalExpression>;

    public constructor(expressionByKey?: { [key: string]: ConditionalExpression }) {
        this._expressionByKey = expressionByKey || {};

        this._onChange = new Event<ConditionalExpression>();
    }

    protected handleChange() {
        const expression = this.build();

        this.onChange.trigger(expression);
    }

    public add(key: any, expression: ConditionalExpression) {
        this._expressionByKey[key] = expression;

        this.handleChange();
    }

    public build(excludeKeys?: any[]): ConditionalExpression {
        const expressionBuilder = new ConditionalExpressionBuilder();

        for (const key in this._expressionByKey) {
            if ((excludeKeys == null) || (excludeKeys.indexOf(key) == -1)) {
                const expression = this._expressionByKey[key];

                if (expression) {
                    expressionBuilder.and(() => expression);
                }
            }
        }

        return expressionBuilder.build();
    }

    public delete(keys: any[]) {
        for (const key of keys) {
            delete this._expressionByKey[key];
        }

        this.handleChange();
    }

    public get(key: any): ConditionalExpression {
        return this._expressionByKey[key];
    }

    public get keys(): any[] {
        return Object.keys(this._expressionByKey);
    }

    public get onChange(): Event<ConditionalExpression> {
        return this._onChange;
    }
}