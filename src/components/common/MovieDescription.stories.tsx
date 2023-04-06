import type { Meta, StoryObj } from "@storybook/react"
import { MovieDescription } from "./MovieDescription"

const meta: Meta<typeof MovieDescription> = {
  component: MovieDescription,
};
export default meta;

export const Default: StoryObj<typeof MovieDescription> = {
  args: {
    bgimg: "img.jpg",
    title: "title",
    description: "紹介文",
  },
  name: "デフォルト",
};
