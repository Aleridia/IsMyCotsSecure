'use client'

import { Input } from '@nextui-org/input'
import { useQuery } from '@tanstack/react-query'
import { Octokit } from 'octokit'

const octokit = new Octokit({
	auth: process.env.GH,
})
export default function GetGH() {
	const githubRepoQuery = useQuery({
		queryKey: ['getRepo'],
		queryFn: () =>
			octokit.request('GET /repos/{owner}/{repo}', {
				owner: 'octokit',
				repo: 'octokit.js',
			}),
	})

	if (githubRepoQuery.isPending) return 'Loading...'

	if (githubRepoQuery.error) return 'An error has occurred: ' + error.message

	const repositoryData = {
		stars: githubRepoQuery.data.data.stargazers_count,
		forks: githubRepoQuery.data.data.forks_count,
		watchers: githubRepoQuery.data.data.watchers_count,
		open_issues: githubRepoQuery.data.data.open_issues_count,
		archivedOrDisabled:
			githubRepoQuery.data.data.archived ||
			githubRepoQuery.data.data.disabled,
		license: githubRepoQuery.data.data.license.name,
	}
	console.log(repositoryData)
	return (
		<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
			<Input type="email" label="Email" />
		</div>
	)
}
