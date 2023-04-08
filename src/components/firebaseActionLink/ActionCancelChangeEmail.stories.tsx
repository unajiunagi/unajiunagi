import type { Meta, StoryObj } from "@storybook/react"
import { ActionCancelChangeEmail } from "./ActionCancelChangeEmail"

const meta: Meta<typeof ActionCancelChangeEmail> = {
  component: ActionCancelChangeEmail,
}
export default meta

export const Default: StoryObj<typeof ActionCancelChangeEmail> = {
  args: {

  },
  name: "デフォルト",
};
