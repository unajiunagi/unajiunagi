import type { Meta, StoryObj } from "@storybook/react"
import { CardLink } from "./CardLink"

const meta: Meta<typeof CardLink> = {
  component: CardLink,
}
export default meta

export const Default: StoryObj<typeof CardLink> = {
  args: {

  },
  name: "デフォルト",
};
