import type { Meta, StoryObj } from "@storybook/react"
import { UploadVideoCard } from "./UploadVideoCard"

const meta: Meta<typeof UploadVideoCard> = {
  component: UploadVideoCard,
}
export default meta

export const Default: StoryObj<typeof UploadVideoCard> = {
  args: {

  },
  name: "デフォルト",
};
