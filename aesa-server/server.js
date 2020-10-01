const { ApolloServer, PubSub } = require('apollo-server')

const typeDefs = require('./graphql/typeDefs')
const { resolvers, pubsub, SENTIMENT_ANALYSIS } = require('./graphql/resolvers')

const { fetchTweets } = require('./api/fetch-tweets')
const { computeScore } = require('./api/compute-sentiment')

const config = require('./config')

let sentiment = 0
let intervalIdentifier

const fetchAndCompute = async () => {
	// Fetch tweets
	const tweets = (await fetchTweets()) ?? []

	// Compute score
	const score = await computeScore(tweets)

	return { tweets, score }
}

const updateSentimentAnalysis = async () => {
	const { score, tweets } = await fetchAndCompute()

	pubsub.publish(SENTIMENT_ANALYSIS, { sentimentAnalysis: { score, tweets } })
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	subscriptions: {
		onConnect: async () => {
			await updateSentimentAnalysis()

			intervalIdentifier = setInterval(updateSentimentAnalysis, config.interval)
		},
		onDisconnect: () => clearInterval(intervalIdentifier),
	},
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server running on URL ${url}`)
	console.log(`Subscriptions available at ${subscriptionsUrl}`)
})
