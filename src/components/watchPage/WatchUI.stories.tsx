import type { Meta, StoryObj } from "@storybook/react"
import { WatchUI } from "./WatchUI"

const meta: Meta<typeof WatchUI> = {
  component: WatchUI,
}
export default meta

export const Default: StoryObj<typeof WatchUI> = {
  args: {},
  name: "デフォルト",
};
