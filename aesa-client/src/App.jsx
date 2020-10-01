import React, { useState } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, useSubscription, HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import { HashLoader } from 'react-spinners'

import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled'

import { theme } from './styles'
import { Tweet, Score, Timeline } from './components'
import { GET_SENTIMENT_ANALYSIS } from './graphql/subscriptions'

const App = () => {
	const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

	const webSocketLink = new WebSocketLink({
		uri: 'ws://localhost:4000/graphql',
		options: {
			reconnect: true,
		},
	})

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query)

			return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
		},
		webSocketLink,
		httpLink,
	)

	const client = new ApolloClient({ link: splitLink, cache: new InMemoryCache() })

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<Container>
					<AnalysisView />
				</Container>
			</ThemeProvider>
		</ApolloProvider>
	)
}

const AnalysisView = () => {
	const [timeline, setTimeline] = useState([])

	const { loading, data, error } = useSubscription(GET_SENTIMENT_ANALYSIS, {
		onSubscriptionData: ({ subscriptionData }) => {
			const score = subscriptionData?.data?.sentimentAnalysis?.score
			setTimeline([...timeline, { updated: new Date().getTime(), score }])
		},
	})

	const { score = 0, tweets = [] } = data?.sentimentAnalysis ?? {}

	if (loading) {
		return (
			<SpinnerContainer>
				<HashLoader size={25} />
				<LoadingLabel>Loading sentiment analysis for #AmazonExplore</LoadingLabel>
			</SpinnerContainer>
		)
	}

	return (
		<ViewContainer>
			<Score score={score} />
			<Timeline timeline={timeline} />
			{tweets.map((tweet, index) => (
				<Tweet key={index} tweet={tweet} />
			))}
		</ViewContainer>
	)
}

const Container = styled.div({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

const ViewContainer = styled.div({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
})

const SpinnerContainer = styled.div(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
	width: '100vw',
}))

const LoadingLabel = styled.span(({ theme }) => ({
	color: theme.colors.twitterBlue,
	textTransform: 'uppercase',
	fontSize: '0.75rem',
	marginLeft: 12,
}))

export default App
