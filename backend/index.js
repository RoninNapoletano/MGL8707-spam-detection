const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const _ = require("lodash");
const { exec } = require('child_process');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const SpamAnalyzer = require('./analyzer/SpamAnalyzer')
const DockerManager = require('./container/DockerManager')

const importantWords = [
    'make', 'address', 'all', '3d', 'our', 'over', 'remove', 'internet',
    'order', 'mail', 'receive', 'will', 'people', 'report', 'addresses',
    'free', 'business', 'email', 'you', 'credit', 'your', 'font', '000',
    'money', 'hp', 'hpl', 'george', '650', 'lab', 'labs', 'telnet', '857',
    'data', '415', '85', 'technology', '1999', 'parts', 'pm', 'direct',
    'cs', 'meeting', 'original', 'project', 're', 'edu', 'table', 'conference'
  ]
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
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.post("/prediction", (req, res) => {
    const inputText = req.body.email;

    const words = tokenizer.tokenize(inputText);
    const spamAnalyzer = new SpamAnalyzer();
    // Calcule afin de créer les features du jeu de données
    spamAnalyzer.calculateSpambaseFeatures(inputText);

    const usefulWords = words.filter(word =>
        importantWords.includes(word.toLowerCase())
      );
    
      spamAnalyzer.calculateWordFrequency(usefulWords);
      spamAnalyzer.calculateCharFrequency(inputText);
      spamAnalyzer.calculateCombinedFeatures();
    
    const orderedSpambaseFeatures = spamAnalyzer.getOrderedFeatures(columnOrder);
    const dockerManager = new DockerManager(orderedSpambaseFeatures)
  
    const dockerResult = dockerManager.createDocker();

    if (!dockerResult.success) {
        res.status(500).send({ error: dockerResult.error });
    } else {
        res.status(200).send(dockerResult.prediction);
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
