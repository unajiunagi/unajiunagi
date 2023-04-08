import type { Meta, StoryObj } from "@storybook/react"
import { EmailVerifyProvider } from "./EmailVerifyProvider"

const meta: Meta<typeof EmailVerifyProvider> = {
  component: EmailVerifyProvider,
}
export default meta

export const Default: StoryObj<typeof EmailVerifyProvider> = {
  args: {

  },
  name: "デフォルト",
};
