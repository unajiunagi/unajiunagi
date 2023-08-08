import type { Meta, StoryObj } from "@storybook/react"
import { FormFields } from "./FormFields"

const meta: Meta<typeof FormFields> = {
  component: FormFields,
}
export default meta

export const Default: StoryObj<typeof FormFields> = {
  args: {

  },
  name: "デフォルト",
};
