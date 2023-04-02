import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { RecommendBox } from "./RecommendBox"

export default {
  component: RecommendBox,
} as ComponentMeta<typeof RecommendBox>

type Template = ComponentStoryObj<typeof RecommendBox>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
