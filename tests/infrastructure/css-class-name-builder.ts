import { expect } from 'chai';
import { CssClassNameBuilder } from '../../src/infrastructure/css-class-name-builder';

export default describe('ClassNameBuilder', () => {
    describe('add', () => {
        it('one class', () => {
            const classNameBuilder = new CssClassNameBuilder();

            classNameBuilder.add('class0');

            expect(classNameBuilder.build()).to.equal('class0');
        });

        it('two classes', () => {
            const classNameBuilder = new CssClassNameBuilder();

            classNameBuilder.add('class0');
            classNameBuilder.add('class1');

            expect(classNameBuilder.build()).to.equal('class0 class1');
        });
    });

    describe('addIf', () => {
        it('condition is true', () => {
            const classNameBuilder = new CssClassNameBuilder();

            classNameBuilder.addIf(true, () => 'class0');

            expect(classNameBuilder.build()).to.equal('class0');
        });

        it('condition is false', () => {
            const classNameBuilder = new CssClassNameBuilder();

            classNameBuilder.addIf(false, () => 'class0');

            expect(classNameBuilder.build()).to.equal(null);
        });
    });
});