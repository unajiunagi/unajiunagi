---
to: "<%= withStory ? `src/components/${path}/${name}.stories.tsx` : null %>"
---
import type { Meta, StoryObj } from "@storybook/react"
import { <%= name %> } from "./<%= name %>"

const meta: Meta<typeof <%= name %>> = {
  component: <%= name %>,
}
export default meta

export const Default: StoryObj<typeof <%= name %>> = {
  args: {

  },
  name: "デフォルト",
};
