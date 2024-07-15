import miserables from '@/miserables.json'
import { useRef, useEffect } from 'react'
import { ForceDirectedGraphChart } from 'chartjs-chart-graph'
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default function GraphPlot() {
	// helper function to format chart data since you do this twice
	const formatData = (data): ForceDirectedGraphChart.ChartData => ({
		labels: data.nodes.map((d) => d.id),
		datasets: [
			{
				pointBackgroundColor: 'steelblue',
				pointRadius: 5,
				data: data.nodes,
				edges: data.links,
			},
		],
	})

	// use a ref to store the chart instance since it it mutable
	const chartRef = useRef<ForceDirectedGraphChart | null>(null)

	// callback creates the chart on the canvas element
	const canvasCallback = (canvas: HTMLCanvasElement | null) => {
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (ctx) {
			chartRef.current = new ForceDirectedGraphChart(ctx, {
				type: 'forceDirectedGraph',
				data: formatData(miserables),
				plugins: [ChartDataLabels],
			})
		}
	}

	// effect to update the chart when props are updated
	useEffect(() => {
		// must verify that the chart exists
		if (chartRef.current) {
			chartRef.current.data = formatData(miserables)
			chartRef.current.update()
		}
	}, [miserables])

	return (
		<div>
			<div className="self-center w-1/2">
				<div className="overflow-hidden">
					<canvas ref={canvasCallback} />
				</div>
			</div>
		</div>
	)
}
