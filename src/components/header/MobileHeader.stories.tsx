import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { MobileHeader } from "./MobileHeader"

export default {
  component: MobileHeader,
} as ComponentMeta<typeof MobileHeader>

type Template = ComponentStoryObj<typeof MobileHeader>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
