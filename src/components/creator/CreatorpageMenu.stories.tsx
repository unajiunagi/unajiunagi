import type { Meta, StoryObj } from '@storybook/react';
import { CreatorpageMenu } from './CreatorpageMenu';

const meta: Meta<typeof CreatorpageMenu> = {
  component: CreatorpageMenu,
};
export default meta;

export const Default: StoryObj<typeof CreatorpageMenu> = {
  args: {},
  name: 'デフォルト',
};
