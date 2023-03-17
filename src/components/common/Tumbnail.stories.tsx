import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Tumbnail } from "./Tumbnail"

export default {
  component: Tumbnail,
} as ComponentMeta<typeof Tumbnail>

type Template = ComponentStoryObj<typeof Tumbnail>

export const Default: Template = {
  args: {
    src: 'img.jpg', alt: 'サムネイル', href: '',
  },
  storyName: "デフォルト",
};
