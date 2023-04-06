import type { Meta, StoryObj } from "@storybook/react"
import { HeaderMenuItem } from "./HeaderMenuItem"

const meta: Meta<typeof HeaderMenuItem> = {
  component: HeaderMenuItem,
}
export default meta

export const Default: StoryObj<typeof HeaderMenuItem> = {
  args: {

  },
  name: "デフォルト",
};
