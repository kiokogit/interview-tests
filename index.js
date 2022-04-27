import express from 'express'
import cors from 'cors'
const data = require('./word_dictionary0634994.json');
const Cache = require('ttl-mem-cache');

const cache = new Cache({ttl:1*60*1000});

const app = express();

app.use(cors);
app.get('/api/:word1/:word2', multipleWordsFunc)

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
})

const multipleWordsFunc = (req, res) => {
    const { word1, word2 } = req.params;

    const theList = []
    const cached = cache.get('list') || []      //cached values as list
   
    for (let p = 1; p <= word1.length - 1; p++) {        //Prefix last letter p
        const pre = String(word1).slice(0, p);
    
        for (let s = word2.length - 1; s >= 0; s--) {       //Suffix first letter s
            const suf = String(word2).slice(s);
            const theWord = pre.concat(suf);
                    
            if (cached !=null && cached.includes(theWord)) {
                theList.push(theWord);
            } else {
                if (data[theWord] === 1) {
                    theList.push(theWord);
                    cache.set('list', cached.push(theWord) )
                }
            }
        };
    };

    if (theList.length > 0) res.status(200).send({ "words": theList });
    else res.status(404).send('no words found') 
};
