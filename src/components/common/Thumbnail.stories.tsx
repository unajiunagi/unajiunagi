import type { Meta, StoryObj } from "@storybook/react"
import { Thumbnail } from "./Thumbnail"

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
};
export default meta;

export const Default: StoryObj<typeof Thumbnail> = {
  args: {
    src: "img.jpg",
    alt: "サムネイル",
    href: "",
  },
  name: "デフォルト",
};
