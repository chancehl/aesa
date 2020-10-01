import { gql } from "@apollo/client";

export const GET_SENTIMENT_ANALYSIS = gql`
	subscription {
		sentimentAnalysis {
			score
			tweets {
				author {
					name
					handle
				}
				text
				retweets
				createdAt
			}
		}
	}
`
