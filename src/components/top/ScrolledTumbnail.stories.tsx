import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { ScrolledTumbnail } from "./ScrolledTumbnail"

export default {
  component: ScrolledTumbnail,
} as ComponentMeta<typeof ScrolledTumbnail>

type Template = ComponentStoryObj<typeof ScrolledTumbnail>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
