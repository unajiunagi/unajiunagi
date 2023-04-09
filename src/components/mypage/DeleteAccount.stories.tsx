import type { Meta, StoryObj } from "@storybook/react"
import { DeleteAccount } from "./DeleteAccount"

const meta: Meta<typeof DeleteAccount> = {
  component: DeleteAccount,
}
export default meta

export const Default: StoryObj<typeof DeleteAccount> = {
  args: {

  },
  name: "デフォルト",
};
