import type { Meta, StoryObj } from "@storybook/react"
import { NumberForm } from "./NumberForm"

const meta: Meta<typeof NumberForm> = {
  component: NumberForm,
}
export default meta

export const Default: StoryObj<typeof NumberForm> = {
  args: {

  },
  name: "デフォルト",
};
