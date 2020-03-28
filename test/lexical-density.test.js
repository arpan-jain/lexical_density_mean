import assert from 'assert';
import {getLexicalComplexity} from '../lib/models/lexical-density';
import {populateMongoDbCollection} from '../lib/dao/non-lexical-dictionary-dao';


describe('Test the core functionality', () => {
    describe('#indexOf()', () => {
        it('Populates the mongodb database', (done) => {
            const nonLexicalWords = ['to',
                'got',
                'is',
                'have',
                'and',
                'although',
                'or',
                'that',
                'when',
                'while',
                'a',
                'either',
                'more',
                'much',
                'neither',
                'my',
                'the',
                'as',
                'no',
                'nor',
                'not',
                'at',
                'between',
                'in',
                'of',
                'without',
                'I',
                'you',
                'he',
                'she',
                'it',
                'we',
                'they',
                'anybody',
                'one'];
            populateMongoDbCollection(nonLexicalWords).then((result) => {
                console.log(result);
                done();
            }).catch((ex) => {
                console.log('ex: ', ex);
                done(ex);
            });
        });

        it('Normal result', (done) => {
            const inputText = 'Kim loves going ​To the ​cinema. \n hello world';

            const expectedResult = {
                "data": {
                    "overall_ld": 0.75,
                    "sentence_ld": [
                        0.67,
                        1
                    ]
                }
            };

            getLexicalComplexity(inputText, true).then((actualResult) => {
                assert.deepEqual(actualResult, expectedResult);
                done();
            }).catch((ex) => {
                done(ex)
            });
        });

        it('More than 100 words', (done) => {
            const inputText = 'hello world\n'.repeat(51);


            getLexicalComplexity(inputText, true).then((actualResult) => {
                done('failed');
            }).catch((ex) => {
                const error = new Error('Invalid String Input');
                error.statusCode = 400;
                assert.deepEqual(ex, error);
                done();
            });
        });

        it('More than 1000 characters', (done) => {
            const inputText = 'abcdefghijklmnopqrstuvxyz\n'.repeat(99);

            getLexicalComplexity(inputText, true).then((actualResult) => {
                done('failed');
            }).catch((ex) => {
                const error = new Error('Invalid String Input');
                error.statusCode = 400;
                assert.deepEqual(ex, error);
                done();
            });
        });
    });
});