import type { Meta, StoryObj } from "@storybook/react"
import { MypageBody } from "./MypageBody"

const meta: Meta<typeof MypageBody> = {
  component: MypageBody,
}
export default meta

export const Default: StoryObj<typeof MypageBody> = {
  args: {

  },
  name: "デフォルト",
};
