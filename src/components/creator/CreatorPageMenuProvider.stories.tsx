import type { Meta, StoryObj } from '@storybook/react';
import { CreatorPageMenuProvider } from 'components/creator/CreatorPageMenuProvider';

const meta: Meta<typeof CreatorPageMenuProvider> = {
  component: CreatorPageMenuProvider,
};
export default meta;

export const Default: StoryObj<typeof CreatorPageMenuProvider> = {
  args: {},
  name: 'デフォルト',
};
