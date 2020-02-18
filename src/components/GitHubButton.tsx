import * as React from "react"

interface GitHubButtonProps {
	url: string
}

export const GitHubButton: React.FC<GitHubButtonProps> = ({url}) => (
	<div>
		<a href={url}>GitHub</a>
	</div>
)
