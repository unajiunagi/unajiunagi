import type { Meta, StoryObj } from "@storybook/react"
import { ActionResetPassword } from "./ActionResetPassword"

const meta: Meta<typeof ActionResetPassword> = {
  component: ActionResetPassword,
}
export default meta

export const Default: StoryObj<typeof ActionResetPassword> = {
  args: {

  },
  name: "デフォルト",
};
