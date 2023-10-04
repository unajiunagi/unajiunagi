import type { Meta, StoryObj } from "@storybook/react";
import { ManagementVideoCard } from "components/creator/ManagementVideoCard";

const meta: Meta<typeof ManagementVideoCard> = {
  component: ManagementVideoCard,
};
export default meta;

export const Default: StoryObj<typeof ManagementVideoCard> = {
  args: {

  },
  name: "デフォルト",
};
