import { Input } from '@nextui-org/input'

export default function GithubRepoInput({getRepositoryInfos}:{getRepositoryInfos: any}) {
	const regexWebsite =
		/((git@|http(s)?:\/\/)([\w\.@]+)(\/|:))([\w,\-,\_]+)\/([\w,\-,\_]+)(.git){0,1}((\/){0,1})/

	return (
		<Input
			onChange={(e) => {
				if (regexWebsite.test(e.target.value)) {
					const matches = e.target.value.match(regexWebsite)
					// setOwner(matches[6])
					// setRepo(matches[7])
				}
			}}
			variant="faded"
			isRequired
			label="Github repository"
		/>
	)
}
