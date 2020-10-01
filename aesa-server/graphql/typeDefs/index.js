const { gql } = require('apollo-server')

const typeDefs = gql`
	type Tweet {
		author: Author
		text: String
		retweets: Int
		createdAt: String
	}

	type Author {
		name: String
		handle: String
	}

	type SentimentAnalysis {
		score: String!
		tweets: [Tweet!]
	}

	type Query {
		tweets: [Tweet]
	}

	type Subscription {
		sentimentAnalysis: SentimentAnalysis!
	}
`

module.exports = typeDefs
