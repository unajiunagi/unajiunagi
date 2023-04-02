import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Cast } from "./Cast"

export default {
  component: Cast,
} as ComponentMeta<typeof Cast>

type Template = ComponentStoryObj<typeof Cast>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
