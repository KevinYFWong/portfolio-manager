import React from "react";
import { storiesOf } from "@storybook/react";
import { GitHubButton } from "../GitHubButton";
storiesOf("GitHubButton", module)
    .add("google",
        () => <GitHubButton url="https://google.com" />
    )
    .add("github",
        () => <GitHubButton url="https://github.com/KevinYFWong/portfolio-manager" />
	)
