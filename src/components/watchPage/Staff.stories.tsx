import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Staff } from "./Staff"

export default {
  component: Staff,
} as ComponentMeta<typeof Staff>

type Template = ComponentStoryObj<typeof Staff>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
