import type { Meta, StoryObj } from "@storybook/react"
import { CreaterpageProvider } from "./CreaterpageProvider"

const meta: Meta<typeof CreaterpageProvider> = {
  component: CreaterpageProvider,
}
export default meta

export const Default: StoryObj<typeof CreaterpageProvider> = {
  args: {

  },
  name: "デフォルト",
};
