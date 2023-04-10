import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbPageBody } from "./BreadcrumbPageBody";

const meta: Meta<typeof BreadcrumbPageBody> = {
  component: BreadcrumbPageBody,
};
export default meta;

export const Default: StoryObj<typeof BreadcrumbPageBody> = {
  args: {},
  name: "デフォルト",
};
