import type { Meta, StoryObj } from "@storybook/react";
import { ManagementVideoModal } from "components/creator/ManagementVideoModal";

const meta: Meta<typeof ManagementVideoModal> = {
  component: ManagementVideoModal,
};
export default meta;

export const Default: StoryObj<typeof ManagementVideoModal> = {
  args: {

  },
  name: "デフォルト",
};
