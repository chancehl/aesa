import React from 'react'
import styled from '@emotion/styled'

// @ts-ignore
import { Chart } from 'react-charts'

const Timeline = ({ timeline = [] }) => {
	const data = React.useMemo(
		() => [
			{
				label: 'Score',
				data: timeline.map((dataPoint) => ({ x: dataPoint.updated, y: dataPoint.score })),
			},
		],
		[timeline],
	)

	return (
		<Container>
			<Chart
				data={data}
				axes={[
					{ primary: true, type: 'ordinal', position: 'bottom' },
					{ type: 'linear', position: 'left' },
				]}
				tooltip
			/>
		</Container>
	)
}

const Container = styled.div({
	width: 600,
	height: 125,
	marginBottom: 36,
})

export { Timeline as default, Timeline }
