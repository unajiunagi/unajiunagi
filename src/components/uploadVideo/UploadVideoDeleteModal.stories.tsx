import type { Meta, StoryObj } from "@storybook/react"
import { UploadVideoDeleteModal } from "./UploadVideoDeleteModal"

const meta: Meta<typeof UploadVideoDeleteModal> = {
  component: UploadVideoDeleteModal,
}
export default meta

export const Default: StoryObj<typeof UploadVideoDeleteModal> = {
  args: {

  },
  name: "デフォルト",
};
