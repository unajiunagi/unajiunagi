import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { DesktopHeader } from "./DesktopHeader"

export default {
  component: DesktopHeader,
} as ComponentMeta<typeof DesktopHeader>

type Template = ComponentStoryObj<typeof DesktopHeader>

export const Default: Template = {
  args: {
    label: "Default",
    name: 'default'
  },
  storyName: "デフォルト",
};
