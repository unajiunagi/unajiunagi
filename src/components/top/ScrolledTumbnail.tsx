import { HStack, Stack } from "@chakra-ui/react";
import { Thumbnail } from "components/common/Thumbnail";
import { staticPath } from "type/$path";

type Props = {
  scrollRef: React.RefObject<HTMLInputElement>;
};

export const ScrolledTumbnail = ({ scrollRef }: Props) => {
  const org = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <HStack ref={scrollRef} spacing={4} overflow="hidden" position="relative">
        {org.map((value) => (
          <Stack key={value} spacing={4}>
            <Thumbnail src={staticPath.logo_png} alt="サムネイル" href="" />
          </Stack>
        ))}
      </HStack>
    </>
  );
};
