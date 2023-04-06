import type { Meta, StoryObj } from "@storybook/react"
import { ScrolledTumbnail } from "./ScrolledTumbnail"

const meta: Meta<typeof ScrolledTumbnail> = {
  component: ScrolledTumbnail,
}
export default meta

export const Default: StoryObj<typeof ScrolledTumbnail> = {
  args: {},
  name: "デフォルト",
};
