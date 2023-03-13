---
to: "<%= withStory ? `src/components/${path}/${name}.stories.tsx` : null %>"
---
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { <%= name %> } from "./<%= name %>"

export default {
  component: <%= name %>,
} as ComponentMeta<typeof <%= name %>>

type Template = ComponentStoryObj<typeof <%= name %>>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
