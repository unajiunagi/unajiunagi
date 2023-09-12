import { Box, Heading, HStack, Spacer, Stack } from '@chakra-ui/react';
import { Chevron } from 'components/top/Chevron';
import { ScrolledTumbnail } from 'components/top/ScrolledTumbnail';
import { useRef, useState } from 'react';

type Props = {
  heading: string;
};

export const RecommendBox = ({ heading }: Props) => {
  const scrollRef = useRef(null);
  const [leftIsShowed, setLeftIsShowed] = useState(false);

  // scrollLeftが0かを確かめるpromiss
  const waitScrollLeftZero = (element: HTMLElement): Promise<void> => {
    return new Promise<void>((resolve) => {
      const checkScrollLeft = () => {
        if (element.scrollLeft === 0) {
          resolve();
        } else {
          requestAnimationFrame(checkScrollLeft);
        }
      };
      requestAnimationFrame(checkScrollLeft);
    });
  };

  const scrollRight = () => {
    const element: HTMLElement = scrollRef.current!;
    element.scrollTo({
      left: element.scrollLeft + 1344,
      behavior: 'smooth',
    });
    setLeftIsShowed(true);
  };

  const scrollLeft = async () => {
    const element: HTMLElement = scrollRef.current!;
    element.scrollTo({
      left: element.scrollLeft - 1344,
      behavior: 'smooth',
    });
    await waitScrollLeftZero(element);
    if (element.scrollLeft === 0) {
      setLeftIsShowed(false);
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <Heading fontSize='3xl'>{heading}</Heading>
        <Box>
          <HStack position='relative' zIndex='overlay' top='180px' mt='-180px'>
            {leftIsShowed ? <Chevron directionIsLeft action={scrollLeft} /> : <></>}
            <Spacer />
            <Chevron directionIsLeft={false} action={scrollRight} />
          </HStack>
          <ScrolledTumbnail scrollRef={scrollRef} />
        </Box>
      </Stack>
    </>
  );
};
