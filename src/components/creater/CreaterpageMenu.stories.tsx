import type { Meta, StoryObj } from "@storybook/react"
import { CreaterpageMenu } from "./CreaterpageMenu"

const meta: Meta<typeof CreaterpageMenu> = {
  component: CreaterpageMenu,
}
export default meta

export const Default: StoryObj<typeof CreaterpageMenu> = {
  args: {

  },
  name: "デフォルト",
};
