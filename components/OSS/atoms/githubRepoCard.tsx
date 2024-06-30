import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
} from '@nextui-org/react'

export default function GithubRepoCard({
	repositoryData,
}: { repositoryData: any }) {
	return (
		<Card className="max-w-[400px]">
			<CardHeader className="flex gap-3">
				<Image
					alt="github repository logo"
					height={40}
					radius="sm"
					src={repositoryData.image}
					width={40}
				/>
				<div className="flex flex-col">
					<p className="text-md">{repositoryData.name}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p> Description : {repositoryData.description}</p>
			</CardBody>
			<Divider />
			<CardFooter>
				<Link isExternal showAnchorIcon href={repositoryData.html_url}>
					Go to the GitHub repository.
				</Link>
			</CardFooter>
		</Card>
	)
}
