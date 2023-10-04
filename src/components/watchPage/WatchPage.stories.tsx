import type { Meta, StoryObj } from '@storybook/react';
import { WatchPage } from 'components/watchPage/WatchPage';

const meta: Meta<typeof WatchPage> = {
  component: WatchPage,
};
export default meta;

export const Default: StoryObj<typeof WatchPage> = {
  args: {},
  name: 'デフォルト',
};
