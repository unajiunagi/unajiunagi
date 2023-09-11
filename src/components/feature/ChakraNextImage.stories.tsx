import type { Meta, StoryObj } from "@storybook/react"
import { ChakraNextImage } from "./ChakraNextImage"

const meta: Meta<typeof ChakraNextImage> = {
  component: ChakraNextImage,
}
export default meta

export const Default: StoryObj<typeof ChakraNextImage> = {
  args: {

  },
  name: "デフォルト",
};
