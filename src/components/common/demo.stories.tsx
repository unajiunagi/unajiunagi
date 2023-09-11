import type { Meta, StoryObj } from "@storybook/react";
import { demo } from "components/common/demo";

const meta: Meta<typeof demo> = {
  component: demo,
};
export default meta;

export const Default: StoryObj<typeof demo> = {
  args: {

  },
  name: "デフォルト",
};
