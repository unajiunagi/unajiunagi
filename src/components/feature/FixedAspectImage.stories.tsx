import type { Meta, StoryObj } from "@storybook/react"
import { FixedAspectImage } from "./FixedAspectImage"

const meta: Meta<typeof FixedAspectImage> = {
  component: FixedAspectImage,
}
export default meta

export const Default: StoryObj<typeof FixedAspectImage> = {
  args: {

  },
  name: "デフォルト",
};
