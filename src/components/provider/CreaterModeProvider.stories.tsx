import type { Meta, StoryObj } from "@storybook/react"
import { CreaterModeProvider } from "./CreaterModeProvider"

const meta: Meta<typeof CreaterModeProvider> = {
  component: CreaterModeProvider,
}
export default meta

export const Default: StoryObj<typeof CreaterModeProvider> = {
  args: {

  },
  name: "デフォルト",
};
