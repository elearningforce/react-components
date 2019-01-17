import { expect } from 'chai';
import { CssClassNameGenerator } from '../../src/infrastructure/css-class-name-generator';

export default describe('ClassNameGenerator', () => {
    describe('generate', () => {
        it('result is different', () => {
            const classNameGenerator = new CssClassNameGenerator();

            const className0 = classNameGenerator.generate();
            const className1 = classNameGenerator.generate();

            expect(className0).is.not.null;
            expect(className1).is.not.null;
            expect(className0).to.not.equal(className1);
        });
    });

    describe('generateByKey', () => {
        it('result is the same', () => {
            const classNameGenerator = new CssClassNameGenerator();

            const className0 = classNameGenerator.generateByKey('0');
            const className1 = classNameGenerator.generateByKey('0');

            expect(className0).is.not.null;
            expect(className1).is.not.null;
            expect(className0).to.equal(className1);
        });
    });
});