import type { Meta, StoryObj } from "@storybook/react"
import { ChangeEmail } from "./ChangeEmail"

const meta: Meta<typeof ChangeEmail> = {
  component: ChangeEmail,
}
export default meta

export const Default: StoryObj<typeof ChangeEmail> = {
  args: {

  },
  name: "デフォルト",
};
