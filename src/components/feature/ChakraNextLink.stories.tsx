import type { Meta, StoryObj } from "@storybook/react";
import { ChakraNextLink } from "./ChakraNextLink";

const meta: Meta<typeof ChakraNextLink> = {
  component: ChakraNextLink,
};
export default meta;

export const Default: StoryObj<typeof ChakraNextLink> = {
  args: {},
  name: "デフォルト",
};
