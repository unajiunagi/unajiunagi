import type { Meta, StoryObj } from "@storybook/react"
import { UploadVideo } from "./UploadVideo"

const meta: Meta<typeof UploadVideo> = {
  component: UploadVideo,
}
export default meta

export const Default: StoryObj<typeof UploadVideo> = {
  args: {

  },
  name: "デフォルト",
};
