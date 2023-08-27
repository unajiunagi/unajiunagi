import type { Meta, StoryObj } from "@storybook/react"
import { UploadVideoComponent } from "./UploadVideoComponent"

const meta: Meta<typeof UploadVideoComponent> = {
  component: UploadVideoComponent,
}
export default meta

export const Default: StoryObj<typeof UploadVideoComponent> = {
  args: {

  },
  name: "デフォルト",
};
