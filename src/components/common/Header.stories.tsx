import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Header } from "./Header"

export default {
  component: Header,
} as ComponentMeta<typeof Header>

type Template = ComponentStoryObj<typeof Header>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
