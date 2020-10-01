import React from 'react'
import styled from '@emotion/styled'

const Tweet = ({ tweet }) => (
	<Container>
		<Metadata>
			<AuthorData>
				<Name>{tweet.author.name}</Name>
				<Handle>{tweet.author.handle}</Handle>
			</AuthorData>
			<CreatedAt>{tweet.createdAt}</CreatedAt>
		</Metadata>
		<Body>{tweet.text}</Body>
		<SocialData>
			<Retweets>Retweets: {tweet.retweets}</Retweets>
		</SocialData>
	</Container>
)

const Container = styled.div(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: 600,
	marginBottom: 48,
}))

const Body = styled.div({
	marginBottom: 12,
})

const SocialData = styled.div({
	display: 'flex',
	justifyContent: 'space-between',
})

const Metadata = styled.div({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 12,
})

const Author = styled.span()

const CreatedAt = styled.span({
	fontSize: '0.75rem',
	fontWeight: 500,
})

const Retweets = styled.span({
	fontSize: '0.75rem',
	fontWeight: 500,
})

const AuthorData = styled.div({
	display: 'flex',
	flexDirection: 'column',
})

const Name = styled.span(({ theme }) => ({
	color: theme.colors.twitterBlue,
	fontWeight: 500,
}))

const Handle = styled.span(({ theme }) => ({
	color: theme.colors.twitterBlue,
	fontWeight: 500,
}))

export { Tweet as default, Tweet }
