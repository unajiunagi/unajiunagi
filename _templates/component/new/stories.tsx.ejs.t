---
to: "<%= `src/components/${path}/${name}.stories.tsx` %>"
---
import type { Meta, StoryObj } from "@storybook/react";
import { <%= name %> } from "components/<%= path %>/<%= name %>";

const meta: Meta<typeof <%= name %>> = {
  component: <%= name %>,
};
export default meta;

export const Default: StoryObj<typeof <%= name %>> = {
  args: {

  },
  name: "デフォルト",
};
