import type { Meta, StoryObj } from "@storybook/react"
import { ManagementVideo } from "./ManagementVideo"

const meta: Meta<typeof ManagementVideo> = {
  component: ManagementVideo,
}
export default meta

export const Default: StoryObj<typeof ManagementVideo> = {
  args: {

  },
  name: "デフォルト",
};
