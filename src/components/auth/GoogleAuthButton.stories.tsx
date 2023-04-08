import type { Meta, StoryObj } from "@storybook/react"
import { GoogleAuthButton } from "./GoogleAuthButton"

const meta: Meta<typeof GoogleAuthButton> = {
  component: GoogleAuthButton,
}
export default meta

export const Default: StoryObj<typeof GoogleAuthButton> = {
  args: {

  },
  name: "デフォルト",
};
