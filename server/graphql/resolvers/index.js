const { PubSub } = require('apollo-server')

const pubSubImplementation = new PubSub()

const SENTIMENT_ANALYSIS = 'SENTIMENT_ANALYSIS'

const resolvers = {
	Subscription: {
		sentimentAnalysis: {
			subscribe: () => pubSubImplementation.asyncIterator(SENTIMENT_ANALYSIS),
		},
	},
}

module.exports = {
	resolvers,
	pubsub: pubSubImplementation,
	SENTIMENT_ANALYSIS,
}
