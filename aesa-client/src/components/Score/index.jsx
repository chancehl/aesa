import React, { useMemo } from 'react'
import styled from '@emotion/styled'

const Score = ({ score }) => (
	<Container>
		<Callout>Overall rating</Callout>
		<ScoreLabel>{score}</ScoreLabel>
	</Container>
)

const Container = styled.div({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: 24,
	padding: 48,
})

const Callout = styled.span(({ theme }) => ({
	textTransform: 'uppercase',
	fontWeight: 500,
	color: theme.colors.twitterBlue,
}))

const ScoreLabel = styled.span({})

export { Score as default, Score }
