import { Icon, Image, Text } from "@chakra-ui/react";

type Props = {};

export const Top = ({ ...props }: Props) => {
  return (
    <>
        <Image
          src="img.jpg"
          alt="INSERT_ALT"
          height="266px"
          width="100%"
          objectFit="cover"
        />
        <Text
          fontFamily="Inter"
          fontWeight="regular"
          fontSize="30px"
          color="#FFFFFF"
          width="129px"
          height="36px"
          textAlign="end"
        >
          タイトル
        </Text>
        <Text
          fontFamily="Inter"
          fontWeight="regular"
          fontSize="10px"
          color="#FFFFFF"
          width="140px"
          height="69px"
          textAlign="end"
        >
          紹介文
        </Text>
    </>
  );
};
