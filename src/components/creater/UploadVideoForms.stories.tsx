import type { Meta, StoryObj } from "@storybook/react"
import { UploadVideoForms } from "./UploadVideoForms"

const meta: Meta<typeof UploadVideoForms> = {
  component: UploadVideoForms,
}
export default meta

export const Default: StoryObj<typeof UploadVideoForms> = {
  args: {

  },
  name: "デフォルト",
};
