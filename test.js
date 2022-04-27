/* const data = require('./API/word_dictionary0634994.json')
const oneWord = (word1, word2) => {
    
    const theList = []
    for (let p = 1; p <= word2.length - 1; p++){        //Prefix last letter p
        const pre = String(word1).slice(0, p);
        for (let s = word2.length - 1; s >= 0; s--){       //Suffix first letter s
            const suf = String(word2).slice(s);
            const theWord = pre.concat(suf);
            
            if (data[theWord] === 1){
                theList.push(theWord);
            }
        }

    }
    if (theList.length > 0) return { "words": theList };
    else return {404: "No words found"}
}

console.log(oneWord('g', 'q'));
 */

const data = require('./API/word_dictionary0634994.json');
const Cache = require('ttl-mem-cache');
const cache = new Cache();

const multipleWordsFunc = (req) => {
    const { word1, word2 } = req.params;

    const theList = []
    const cached = cache.get('list') || []      //cached values as list

   
    for (let p = 1; p <= word1.length - 1; p++) {        //Prefix last letter p
        const pre = String(word1).slice(0, p);
    
        for (let s = word2.length - 1; s >= 0; s--) {       //Suffix first letter s
            const suf = String(word2).slice(s);
            const theWord = pre.concat(suf);
                    
            memoize(theWord)
        };
    };

    function memoize(word) {
            if (cached !=null && cached.includes(word)) {
                theList.push(word);
            } else {
                if (data[word] === 1) {
                    theList.push(word);
                    cache.set('list', cached.push(word), 1*60*1000 )
                }
            }
    };

    if (theList.length > 0) console.log({ "words": theList });
    else console.log('no words found') 
};