import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Top } from "./Top"

export default {
  component: Top,
} as ComponentMeta<typeof Top>

type Template = ComponentStoryObj<typeof Top>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
