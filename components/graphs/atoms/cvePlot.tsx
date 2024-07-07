import Chart from 'chart.js/auto'
import { useRef, useEffect, useState } from 'react'

export default function CvePlot() {
	interface Props {
		year: number
		count: number
	}

	const [data, setData] = useState<Props[]>([
		{ year: 2010, count: 10 },
		{ year: 2011, count: 20 },
		{ year: 2012, count: 15 },
		{ year: 2013, count: 25 },
		{ year: 2014, count: 22 },
		{ year: 2015, count: 30 },
		{ year: 2016, count: 28 },
	])

	// helper function to format chart data since you do this twice
	const formatData = (data: Props[]): Chart.ChartData => ({
		labels: data.map((row) => row.year),
		datasets: [
			{
				label: 'Acquisitions by year',
				data: data.map((row) => row.count),
			},
		],
	})

	// use a ref to store the chart instance since it it mutable
	const chartRef = useRef<Chart | null>(null)

	// callback creates the chart on the canvas element
	const canvasCallback = (canvas: HTMLCanvasElement | null) => {
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (ctx) {
			chartRef.current = new Chart(ctx, {
				type: 'bar',
				data: formatData(data),
				options: { responsive: true },
			})
		}
	}

	// effect to update the chart when props are updated
	useEffect(() => {
		// must verify that the chart exists
		if (chartRef.current) {
			chartRef.current.data = formatData(data)
			chartRef.current.update()
		}
	}, [data])

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
