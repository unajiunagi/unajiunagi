import type { Meta, StoryObj } from "@storybook/react"
import { ActionAuthEmail } from "./ActionAuthEmail"

const meta: Meta<typeof ActionAuthEmail> = {
  component: ActionAuthEmail,
}
export default meta

export const Default: StoryObj<typeof ActionAuthEmail> = {
  args: {

  },
  name: "デフォルト",
};
