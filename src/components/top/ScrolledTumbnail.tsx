import { HStack, Stack } from "@chakra-ui/react";
import { Thumbnail } from "components/common/Thumbnail";

type Props = {
  scrollRef: React.RefObject<HTMLInputElement>;
};

export const ScrolledTumbnail = ({ scrollRef }: Props) => {
  const org = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <HStack ref={scrollRef} spacing={4} overflow="hidden" position="relative">
        {org.map((org) => (
          <Stack key={org} spacing={4}>
            <Thumbnail src="img.jpg" alt="サムネイル" href="" />
          </Stack>
        ))}
      </HStack>
    </>
  );
};
