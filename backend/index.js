const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const fs = require("fs/promises");
const _ = require("lodash");
const {v4: uuid} = require("uuid");
const { spawnSync  } = require('child_process');
// file deepcode ignore JavascriptDuplicateImport: <please specify a reason of ignoring this>
const { exec } = require('child_process');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stopwords = require('natural').stopwords;

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());
const spambaseColumns = [
'word_freq_make', 'word_freq_address', 'word_freq_all', 'word_freq_3d',
       'word_freq_our', 'word_freq_over', 'word_freq_remove',
       'word_freq_internet', 'word_freq_order', 'word_freq_mail',
       'word_freq_receive', 'word_freq_will', 'word_freq_people',
       'word_freq_report', 'word_freq_addresses', 'word_freq_free',
       'word_freq_business', 'word_freq_email', 'word_freq_you',
       'word_freq_credit', 'word_freq_your', 'word_freq_font', 'word_freq_000',
       'word_freq_money', 'word_freq_hp', 'word_freq_hpl', 'word_freq_george',
       'word_freq_650', 'word_freq_lab', 'word_freq_labs', 'word_freq_telnet',
       'word_freq_857', 'word_freq_data', 'word_freq_415', 'word_freq_85',
       'word_freq_technology', 'word_freq_1999', 'word_freq_parts',
       'word_freq_pm', 'word_freq_direct', 'word_freq_cs', 'word_freq_meeting',
       'word_freq_original', 'word_freq_project', 'word_freq_re',
       'word_freq_edu', 'word_freq_table', 'word_freq_conference',
       'char_freq_%3B', 'char_freq_%28', 'char_freq_%5B', 'char_freq_%21',
       'char_freq_%24', 'char_freq_%23']

const columnOrder  = [
        'word_freq_make', 'word_freq_address', 'word_freq_all', 'word_freq_3d',
               'word_freq_our', 'word_freq_over', 'word_freq_remove',
               'word_freq_internet', 'word_freq_order', 'word_freq_mail',
               'word_freq_receive', 'word_freq_will', 'word_freq_people',
               'word_freq_report', 'word_freq_addresses', 'word_freq_free',
               'word_freq_business', 'word_freq_email', 'word_freq_you',
               'word_freq_credit', 'word_freq_your', 'word_freq_font', 'word_freq_000',
               'word_freq_money', 'word_freq_hp', 'word_freq_hpl', 'word_freq_george',
               'word_freq_650', 'word_freq_lab', 'word_freq_labs', 'word_freq_telnet',
               'word_freq_857', 'word_freq_data', 'word_freq_415', 'word_freq_85',
               'word_freq_technology', 'word_freq_1999', 'word_freq_parts',
               'word_freq_pm', 'word_freq_direct', 'word_freq_cs', 'word_freq_meeting',
               'word_freq_original', 'word_freq_project', 'word_freq_re',
               'word_freq_edu', 'word_freq_table', 'word_freq_conference',
               'char_freq_%3B', 'char_freq_%28', 'char_freq_%5B', 'char_freq_%21',
               'char_freq_%24', 'char_freq_%23', 'capital_run_length_average', 'capital_run_length_longest', 
               'capital_run_length_total', 'combined_415_857_log', 'combined_hp_hpl_log', 'combined_direct_415_log',
               'combined_direct_857_log'
            ]
const charFreqChars = [';', '(', '[', '!', '$', '#'];

    function calculateSpambaseFeatures(preprocessedText) {
        const features = {};
      
        // Calcul des trois fonctionnalités spécifiques
        // file deepcode ignore HTTPSourceWithUncheckedType: <please specify a reason of ignoring this>
        const capitalRunLengths = preprocessedText.match(/[A-Z]+/g) || [];
        const capitalRunLengthAverage = capitalRunLengths.reduce((sum, sequence) => sum + sequence.length, 0) / (capitalRunLengths.length || 1); // Ajout d'une division par 1 en cas de capitalRunLengths.length nul
        const capitalRunLengthLongest = Math.max(...capitalRunLengths.map(sequence => sequence.length));
        const capitalRunLengthTotal = capitalRunLengths.reduce((sum, sequence) => sum + sequence.length, 0);
      
        features["capital_run_length_average"] = capitalRunLengthAverage;
        features['capital_run_length_longest'] = capitalRunLengthLongest;
        features['capital_run_length_total'] = capitalRunLengthTotal;

      
        return features;
    }
      
    function calculateWordFrequency(wordsList, word) {
        const totalWords = wordsList.length;
        const wordFreq = wordsList.filter(w => w.toLowerCase() === word.toLowerCase()).length / totalWords * 100;
        return wordFreq;
    }
    function calculateCharFrequency(text, char) {
        const totalChars = text.length;
        const charFreq = (text.split(char).length - 1) / totalChars * 100;
        return charFreq;
    }
app.post("/prediction", (req, res) => {
    const inputText = req.body.email;
    // Tokenisation du texte en mots
    const words = tokenizer.tokenize(inputText);
    const spambaseFeatures = calculateSpambaseFeatures(inputText);

    const importantWords = [
        'make', 'address', 'all', '3d', 'our', 'over', 'remove', 'internet',
        'order', 'mail', 'receive', 'will', 'people', 'report', 'addresses',
        'free', 'business', 'email', 'you', 'credit', 'your', 'font', '000',
        'money', 'hp', 'hpl', 'george', '650', 'lab', 'labs', 'telnet', '857',
        'data', '415', '85', 'technology', '1999', 'parts', 'pm', 'direct',
        'cs', 'meeting', 'original', 'project', 're', 'edu', 'table', 'conference'
      ]

    // Supprimer les mots inutiles en conservant les mots importants
    const usefulWords = words.filter(word =>
      /*!stopwords.includes(word.toLowerCase()) ||*/ importantWords.includes(word.toLowerCase())
    );    
    spambaseColumns.forEach(column => {
        const word = column.replace('word_freq_', '');
        const wordFreq = calculateWordFrequency(usefulWords, word);
        spambaseFeatures[column] = wordFreq;
    });

    charFreqChars.forEach(char => {
        const column = `char_freq_%${char.charCodeAt(0).toString(16).toUpperCase()}`; // Créer le nom de colonne
        const charFreq = calculateCharFrequency(inputText, char);
        spambaseFeatures[column] = charFreq;
    });

    spambaseFeatures['combined_415_857_log'] = Math.log(spambaseFeatures['word_freq_415'] + 1) * Math.log(spambaseFeatures['word_freq_857'] + 1);
    spambaseFeatures['combined_hp_hpl_log'] = Math.log(spambaseFeatures['word_freq_hp'] + 1) * Math.log(spambaseFeatures['word_freq_hpl'] + 1);
    spambaseFeatures['combined_direct_415_log'] = Math.log(spambaseFeatures['word_freq_direct'] + 1) * Math.log(spambaseFeatures['word_freq_415'] + 1);
    spambaseFeatures['combined_direct_857_log'] = Math.log(spambaseFeatures['word_freq_direct'] + 1) * Math.log(spambaseFeatures['word_freq_857'] + 1);
    console.log(spambaseFeatures);

    const orderedSpambaseFeatures = {};
    for (const columnName of columnOrder) {
      orderedSpambaseFeatures[columnName] = spambaseFeatures[columnName];
    }
    const dockerRunCommand = `docker run -d -p 3001:3001 -e INPUT_DATA="${JSON.stringify(orderedSpambaseFeatures).replace(/"/g, '\\"')}" modele_uci:latest`;
    exec(dockerRunCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de l'exécution de la commande : ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Erreur de la commande : ${stderr}`);
          return;
        }
        console.log(`Sortie de la commande : ${stdout}`);
      });
    res.sendStatus(200); // Changed to 200 for OK response
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
