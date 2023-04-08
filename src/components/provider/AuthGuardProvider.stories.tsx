import type { Meta, StoryObj } from "@storybook/react"
import { AuthGuardProvider } from "./AuthGuardProvider"

const meta: Meta<typeof AuthGuardProvider> = {
  component: AuthGuardProvider,
}
export default meta

export const Default: StoryObj<typeof AuthGuardProvider> = {
  args: {

  },
  name: "デフォルト",
};
