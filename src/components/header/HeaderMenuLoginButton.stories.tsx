import type { Meta, StoryObj } from "@storybook/react"
import { HeaderMenuLoginButton } from "./HeaderMenuLoginButton"

const meta: Meta<typeof HeaderMenuLoginButton> = {
  component: HeaderMenuLoginButton,
}
export default meta

export const Default: StoryObj<typeof HeaderMenuLoginButton> = {
  args: {

  },
  name: "デフォルト",
};
