const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = require('natural')
const aposToLexForm = require('apos-to-lex-form')
const stopWord = require('stopword')

const LANG = 'English'
const ALGO = 'afinn'

const preprocessData = (str) => {
	const deTwitterifiedString = str
		.replace(/\@\w+/g, '')
		.replace(/RT\s/g, '')
		.replace(/(https?:\/\/[^\s]+)/g, '')

	const lexedString = aposToLexForm(deTwitterifiedString)
	const casedString = lexedString.toLowerCase()
	const alphaOnlyString = casedString.replace(/[^a-zA-Z\s]+/g, '')

	const tokenizer = new WordTokenizer()
	const tokenizedString = tokenizer.tokenize(alphaOnlyString)

	const filteredString = stopWord.removeStopwords(tokenizedString)

	return filteredString
}

const computeScore = (tweets = []) => {
	let scores = []

	if (!tweets.length) {
		return 0
	}

	for (let i = 0; i < tweets.length; i++) {
		const { text } = tweets[i]

		// preprocess the tweet
		const processedString = preprocessData(text)

		// compute score
		const analyzer = new SentimentAnalyzer(LANG, PorterStemmer, ALGO)
		const analysis = analyzer.getSentiment(processedString)

		scores.push(analysis)
	}

	return scores.reduce((current, previous) => (current += previous), 0) / scores.length
}

module.exports = { computeScore }
