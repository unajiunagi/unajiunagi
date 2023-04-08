import type { Meta, StoryObj } from "@storybook/react"
import { ActionCancel2Auth } from "./ActionCancel2Auth"

const meta: Meta<typeof ActionCancel2Auth> = {
  component: ActionCancel2Auth,
}
export default meta

export const Default: StoryObj<typeof ActionCancel2Auth> = {
  args: {

  },
  name: "デフォルト",
};
