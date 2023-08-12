import type { Meta, StoryObj } from "@storybook/react"
import { MypageMenuProvider } from "./MypageMenuProvider"

const meta: Meta<typeof MypageMenuProvider> = {
  component: MypageMenuProvider,
}
export default meta

export const Default: StoryObj<typeof MypageMenuProvider> = {
  args: {

  },
  name: "デフォルト",
};
