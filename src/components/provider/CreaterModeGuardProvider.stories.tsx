import type { Meta, StoryObj } from "@storybook/react"
import { CreaterModeGuardProvider } from "./CreaterModeGuardProvider"

const meta: Meta<typeof CreaterModeGuardProvider> = {
  component: CreaterModeGuardProvider,
}
export default meta

export const Default: StoryObj<typeof CreaterModeGuardProvider> = {
  args: {

  },
  name: "デフォルト",
};
