import type { Meta, StoryObj } from "@storybook/react"
import { Loading } from "./Loading"

const meta: Meta<typeof Loading> = {
  component: Loading,
}
export default meta

export const Default: StoryObj<typeof Loading> = {
  args: {

  },
  name: "デフォルト",
};
