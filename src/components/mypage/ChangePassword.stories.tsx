import type { Meta, StoryObj } from "@storybook/react"
import { ChangePassword } from "./ChangePassword"

const meta: Meta<typeof ChangePassword> = {
  component: ChangePassword,
}
export default meta

export const Default: StoryObj<typeof ChangePassword> = {
  args: {

  },
  name: "デフォルト",
};
