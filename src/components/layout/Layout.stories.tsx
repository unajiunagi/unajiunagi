import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Layout } from "./Layout"

export default {
  component: Layout,
} as ComponentMeta<typeof Layout>

type Template = ComponentStoryObj<typeof Layout>

export const Default: Template = {
  args: {
    
  },
  storyName: "デフォルト",
};
