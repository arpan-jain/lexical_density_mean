import _ from 'underscore';
import bluebird from 'bluebird';
import {getNonLexicalWords} from '../dao/non-lexical-dictionary-dao';

/**
 * get lexical density for given paragraph.
 * @param para
 * @param isVerbose
 * @returns {Promise<{data: {overall_ld: number}}>}
 */
export const getLexicalComplexity = async (para, isVerbose) => {
    try {
        // valdate para
        // get all words from para, create a dictionary of non-lexi words present in all words
        // get all sentences
        // for each sentence, get lexical density
        // return


        const totalWords = para.match(/[\w]+/g);

        if (totalWords.length > 100 || para.length > 1000) {
            const error = new Error('Invalid String Input');
            error.statusCode = 400;
            throw error;
        }

        const totalNonLexicalWords = await getNonLexicalWords(_.uniq(totalWords));

        const data = {
            overall_ld: parseFloat(((totalWords.length - totalNonLexicalWords.length) / totalWords.length).toFixed(2))
        };

        if (isVerbose) {
            const sentences = para.split(/\n+/g);
            data['sentence_ld'] = [];
            await bluebird.mapSeries(sentences, async (currentSentence) => {
                if (!currentSentence.length) {
                    return;
                }
                const sentenceWords = currentSentence.match(/[\w]+/g);
                const sentenceNonLexicalWords = await getNonLexicalWords(_.uniq(sentenceWords));
                data['sentence_ld'].push(parseFloat(((sentenceWords.length - sentenceNonLexicalWords.length) / sentenceWords.length).toFixed(2)));
            });
        }

        return {data};

    } catch (ex) {
        throw ex;
    }
}