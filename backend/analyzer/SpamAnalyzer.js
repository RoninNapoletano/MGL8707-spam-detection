const natural = require('natural');
const charFreqChars = [';', '(', '[', '!', '$', '#'];
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
    


class SpamAnalyzer {
  constructor() {
    this.features = {};
  }

  calculateSpambaseFeatures(preprocessedText) {
    // Calculate capital run length features
    const capitalRunLengths = preprocessedText.match(/[A-Z]+/g) || [];
    const capitalRunLengthAverage = capitalRunLengths.reduce((sum, sequence) => sum + sequence.length, 0) / (capitalRunLengths.length || 1);
    const capitalRunLengthLongest = Math.max(...capitalRunLengths.map(sequence => sequence.length));
    const capitalRunLengthTotal = capitalRunLengths.reduce((sum, sequence) => sum + sequence.length, 0);

    this.features["capital_run_length_average"] = capitalRunLengthAverage;
    this.features['capital_run_length_longest'] = capitalRunLengthLongest;
    this.features['capital_run_length_total'] = capitalRunLengthTotal;
  }

  calculateWordFrequency(wordsList) {
    const totalWords = wordsList.length;

    for (const column of spambaseColumns) {
      const word = column.replace('word_freq_', '');
      const wordFreq = wordsList.filter(w => w.toLowerCase() === word.toLowerCase()).length / totalWords * 100;
      this.features[column] = wordFreq;
    }
  }

  calculateCharFrequency(text) {
    const totalChars = text.length;

    for (const char of charFreqChars) {
      const column = `char_freq_%${char.charCodeAt(0).toString(16).toUpperCase()}`;
      const charFreq = (text.split(char).length - 1) / totalChars * 100;
      this.features[column] = charFreq;
    }
  }

  calculateCombinedFeatures() {
    // Calculate combined features
    this.features['combined_415_857_log'] = Math.log(this.features['word_freq_415'] + 1) * Math.log(this.features['word_freq_857'] + 1);
    this.features['combined_hp_hpl_log'] = Math.log(this.features['word_freq_hp'] + 1) * Math.log(this.features['word_freq_hpl'] + 1);
    this.features['combined_direct_415_log'] = Math.log(this.features['word_freq_direct'] + 1) * Math.log(this.features['word_freq_415'] + 1);
    this.features['combined_direct_857_log'] = Math.log(this.features['word_freq_direct'] + 1) * Math.log(this.features['word_freq_857'] + 1);
  }

  getOrderedFeatures(columnOrder) {
    const orderedSpambaseFeatures = {};
    for (const columnName of columnOrder) {
      orderedSpambaseFeatures[columnName] = this.features[columnName];
    }
    return orderedSpambaseFeatures;
  }
}

module.exports = SpamAnalyzer;