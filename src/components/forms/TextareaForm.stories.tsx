import type { Meta, StoryObj } from "@storybook/react"
import { TextareaForm } from "./TextareaForm"

const meta: Meta<typeof TextareaForm> = {
  component: TextareaForm,
}
export default meta

export const Default: StoryObj<typeof TextareaForm> = {
  args: {

  },
  name: "デフォルト",
};
