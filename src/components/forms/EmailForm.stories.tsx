import type { Meta, StoryObj } from "@storybook/react"
import { EmailForm } from "./EmailForm"

const meta: Meta<typeof EmailForm> = {
  component: EmailForm,
}
export default meta

export const Default: StoryObj<typeof EmailForm> = {
  args: {

  },
  name: "デフォルト",
};
