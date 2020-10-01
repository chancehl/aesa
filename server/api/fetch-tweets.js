const Twitter = require('twitter')

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

let tweets = []

const MAX = 50
const QUERY = `"Amazon Explore"`
const COUNT = 25
const LANG = 'en'

const fetchTweets = async () => {
	try {
		let addedNewTweet = false

		const fetchedData = await client.get('search/tweets', { q: QUERY, count: COUNT, lang: LANG })

		const rawTweets = fetchedData?.statuses ?? []
		const filteredTweets = rawTweets.filter((tweet) => tweet.retweeted_status == null && new Date(tweet.created_at) >= 1601362800000)

		const sortedTweets = filteredTweets.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

		for (const tweet of sortedTweets) {
			if (!tweets.map((tweet) => tweet.id).includes(tweet.id)) {
				console.log(`\n@${tweet.user.screen_name} just tweeted:\n"${tweet.text}"\n`)

				tweets.unshift(tweet)

				addedNewTweet = true
			}
		}

		if (!addedNewTweet) {
			console.log(`No new tweets found at ${new Date().toISOString()}`)
		}

		return tweets
			.map((tweet) => ({
				id: tweet.id,
				author: {
					name: tweet.user.name,
					handle: '@'.concat(tweet.user.screen_name),
				},
				createdAt: tweet.created_at,
				text: tweet.text,
				retweets: tweet.retweet_count,
			}))
			.slice(0, MAX)
	} catch (ex) {
		console.error('Encountered an error while fetching tweets.', ex)
	}
}

module.exports = { fetchTweets }
