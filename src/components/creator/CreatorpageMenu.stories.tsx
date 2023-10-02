import type { Meta, StoryObj } from '@storybook/react';
import { CreatorPageMenu } from 'components/creator/CreatorPageMenu';

const meta: Meta<typeof CreatorPageMenu> = {
  component: CreatorPageMenu,
};
export default meta;

export const Default: StoryObj<typeof CreatorPageMenu> = {
  args: {},
  name: 'デフォルト',
};
