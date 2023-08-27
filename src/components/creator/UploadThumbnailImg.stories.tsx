import type { Meta, StoryObj } from "@storybook/react";
import { UploadThumbnailImg } from "creator/UploadThumbnailImg";

const meta: Meta<typeof UploadThumbnailImg> = {
  component: UploadThumbnailImg,
};
export default meta;

export const Default: StoryObj<typeof UploadThumbnailImg> = {
  args: {},
  name: "デフォルト",
};
