import type { Meta, StoryObj } from "@storybook/react"
import { UploadVideoModal } from "./UploadVideoModal"

const meta: Meta<typeof UploadVideoModal> = {
  component: UploadVideoModal,
}
export default meta

export const Default: StoryObj<typeof UploadVideoModal> = {
  args: {

  },
  name: "デフォルト",
};
