import type { Meta, StoryObj } from "@storybook/react"
import { PassForm } from "./PassForm"

const meta: Meta<typeof PassForm> = {
  component: PassForm,
}
export default meta

export const Default: StoryObj<typeof PassForm> = {
  args: {

  },
  name: "デフォルト",
};
