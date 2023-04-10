import type { Meta, StoryObj } from "@storybook/react"
import { DesktopCreaterPage } from "./DesktopCreaterPage"

const meta: Meta<typeof DesktopCreaterPage> = {
  component: DesktopCreaterPage,
}
export default meta

export const Default: StoryObj<typeof DesktopCreaterPage> = {
  args: {

  },
  name: "デフォルト",
};
