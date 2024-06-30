'use client'

import { useQuery } from '@tanstack/react-query'
import { Octokit } from 'octokit'
import GithubRepoCard from '@/components/OSS/atoms/githubRepoCard'

import { useState } from 'react'
import { Divider, Input, Button } from '@nextui-org/react'

const octokit = new Octokit({
	auth: process.env.GH,
})

export default function GetGH() {
	const [githubRepoQuery, setGithubRepoQuery] = useState<any>('')
	const regexWebsite =
		/((git@|http(s)?:\/\/)([\w\.@]+)(\/|:))([\w,\-,\_]+)\/([\w,\-,\_]+)(.git){0,1}((\/){0,1})/

	let isErrorQuery = false
	let isPendingQuery = true
	let isHidden = true

	//Function to launch the query
	const getRepositoryInfos: any = (
		{ owner }: { owner: string },
		{ repo }: { repo: string },
	) => {
		// const githubRepoQuery = useQuery({
		// 	queryKey: ['getRepo'],
		// 	queryFn: () =>
		// 		octokit.request('GET /repos/{owner}/{repo}', {
		// 			owner: { owner },
		// 			repo: repo,
		// 		}),
		// })
		isPendingQuery = githubRepoQuery.isPending
		isHidden = false
	}
	// // if query is not launched or pending
	// if (githubRepoQuery.isPending)
	// 	return <GithubRepoInput setRepo={setRepo} setOwner={setOwner} />

	// if (githubRepoQuery.error)
	// 	return `An error has occurred: ${githubRepoQuery.error.code}`

	const repositoryData = ''
	// const repositoryData = {
	// 	stars: githubRepoQuery.data.data.stargazers_count,
	// 	name: githubRepoQuery.data.data.name,
	// 	description: githubRepoQuery.data.data.description,
	// 	html_url: githubRepoQuery.data.data.html_url,
	// 	forks: githubRepoQuery.data.data.forks_count,
	// 	watchers: githubRepoQuery.data.data.watchers_count,
	// 	open_issues: githubRepoQuery.data.data.open_issues_count,
	// 	archivedOrDisabled:
	// 		githubRepoQuery.data.data.archived ||
	// 		githubRepoQuery.data.data.disabled,
	// 	license: githubRepoQuery.data.data.license.name,
	// 	image: githubRepoQuery.data.data.owner.avatar_url,
	// }

	return (
		<div>
			<Input
				onChange={(e) => {
					if (regexWebsite.test(e.target.value)) {
						const matches = e.target.value.match(regexWebsite)
						if (
							matches === null ||
							matches[6] === null ||
							matches[7] === null
						) {
							isErrorQuery = true
						} else getRepositoryInfos(matches[6], matches[7])
					}
				}}
				variant="faded"
				isRequired
				label="Github repository"
			/>
			{isErrorQuery ? (
				<p>Error while fetching project</p>
			) : isHidden ? (
				''
			) : isPendingQuery ? (
				<Button color="primary" isLoading>
					Loading
				</Button>
			) : (
				<div>
					<Divider className="my-4" />
					<GithubRepoCard repositoryData={repositoryData} />
				</div>
			)}
		</div>
	)
}
