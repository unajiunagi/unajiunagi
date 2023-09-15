import type { Meta, StoryObj } from "@storybook/react";
import { ManagementVideoDeleteModal } from "components/creator/ManagementVideoDeleteModal";

const meta: Meta<typeof ManagementVideoDeleteModal> = {
  component: ManagementVideoDeleteModal,
};
export default meta;

export const Default: StoryObj<typeof ManagementVideoDeleteModal> = {
  args: {

  },
  name: "デフォルト",
};
