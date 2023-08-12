import type { Meta, StoryObj } from "@storybook/react"
import { MypageMenu } from "./MypageMenu"

const meta: Meta<typeof MypageMenu> = {
  component: MypageMenu,
}
export default meta

export const Default: StoryObj<typeof MypageMenu> = {
  args: {

  },
  name: "デフォルト",
};
