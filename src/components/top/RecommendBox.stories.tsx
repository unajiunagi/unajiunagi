import type { Meta, StoryObj } from "@storybook/react"
import { RecommendBox } from "./RecommendBox"

const meta: Meta<typeof RecommendBox> = {
  component: RecommendBox,
}
export default meta

export const Default: StoryObj<typeof RecommendBox> = {
  args: {},
  name: "デフォルト",
};
