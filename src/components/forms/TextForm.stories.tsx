import type { Meta, StoryObj } from "@storybook/react"
import { TextForm } from "./TextForm"

const meta: Meta<typeof TextForm> = {
  component: TextForm,
}
export default meta

export const Default: StoryObj<typeof TextForm> = {
  args: {

  },
  name: "デフォルト",
};
