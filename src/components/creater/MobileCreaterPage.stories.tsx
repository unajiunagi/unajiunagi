import type { Meta, StoryObj } from "@storybook/react"
import { MobileCreaterPage } from "./MobileCreaterPage"

const meta: Meta<typeof MobileCreaterPage> = {
  component: MobileCreaterPage,
}
export default meta

export const Default: StoryObj<typeof MobileCreaterPage> = {
  args: {

  },
  name: "デフォルト",
};
