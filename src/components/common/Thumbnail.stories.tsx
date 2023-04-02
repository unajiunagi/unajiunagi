import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Thumbnail } from "./Thumbnail"

export default {
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>

type Template = ComponentStoryObj<typeof Thumbnail>

export const Default: Template = {
  args: {
    src: 'img.jpg', alt: 'サムネイル', href: '',
  },
  storyName: "デフォルト",
};
