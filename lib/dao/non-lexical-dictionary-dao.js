import config from 'config';
import bluebird from 'bluebird';
import _ from 'underscore';
import {getDb} from '../../utils/mongodb';


/**
 * for a given set of words, return all the matching non-lexical words
 * @param allWords
 * @returns {Promise<[]>}
 */
export const getNonLexicalWords = async (allWords) => {

    const db = await getDb();
    const {mongoDbCollection} = config.mongo;
    const collection = db.collection(mongoDbCollection);
    // get all non lexical words stored at _id:1
    const nonLexicalWords = (await collection.find({_id: 1}).toArray())[0];


    const result = [];
    allWords.forEach((word) => {
        if (nonLexicalWords[word.toLowerCase()]) {
            result.push(word);
        }
    });
    return result;
};

/**
 * drop document and rebuild it with non-lexical words
 * @param words
 * @returns {Promise<boolean>}
 */
export const populateMongoDbCollection = async (words) => {

    const db = await getDb();
    const {mongoDbCollection} = config.mongo;
    const collection = db.collection(mongoDbCollection);
    await collection.deleteOne({_id: 1});
    const doc = _.indexBy(words, element => element);
    doc._id = 1;
    const result = await collection.insert(doc);
    console.log('result : ', result);
    return true;
};