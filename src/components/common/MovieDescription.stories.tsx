import type { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { MovieDescription } from "./MovieDescription"

export default {
  component: MovieDescription,
} as ComponentMeta<typeof MovieDescription>

type Template = ComponentStoryObj<typeof MovieDescription>

export const Default: Template = {
  args: {
    bgimg:"img.jpg",
    title:"title",
    description:"紹介文",
  },
  storyName: "デフォルト",
};
