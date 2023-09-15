import { Heading, ListItem, OrderedList, Stack, Text } from '@chakra-ui/react';

export default () => {
  return (
    <Stack width='90%' margin='auto' pt={6} pb={6}>
      <Heading as='h2' fontSize='5xl'>
        利用規約
      </Heading>
      <Stack spacing='4'>
        <Heading as='h3' fontSize='2xl'>
          第1条（定義）
        </Heading>
        <Text fontSize='lg'>
          本規約において「クリエイター」とは、当社が提供する映画の配信サービスにおいて、映画をアップロードする個人または法人をいいます。 本規約において「本サービス」とは、当社が提供する映画の配信サービスをいいます。 本規約において「ユーザー」とは、本サービスを利用する個人または法人をいいます。
        </Text>
        <Heading as='h3' fontSize='2xl'>
          第2条（クリエイターの権利）
        </Heading>
        <Text fontSize='lg'>
          クリエイターは、本サービスにおいて、自己が制作した映画をアップロードすることができます。 クリエイターは、本サービスにおいて、自己の映画の公衆送信権、送信可能化権、上映権を当社に許諾するものとします。
          クリエイターは、本サービスにおいて、自己の映画に関する著作権を有するものとし、当社に対し、著作権法上認められる範囲内での利用を許諾するものとします。 クリエイターは、当社に対し、自己の映画に関する著作権侵害等のクレームがあった場合には、速やかにその旨を通知するものとします。
        </Text>
        <Heading as='h3' fontSize='2xl'>
          第3条（ユーザーの利用）
        </Heading>
        <Text fontSize='lg'>
          ユーザーは、本サービスにおいて、クリエイターがアップロードした映画を購入、視聴することができます。 ユーザーは、本サービスにおいて、クリエイターがアップロードした映画を、自己の私的利用の範囲内でのみ使用することができます。
          ユーザーは、本サービスにおいて、クリエイターがアップロードした映画を、複製、改変、再利用することはできません。
        </Text>
        <Heading as='h3' fontSize='2xl'>
          第4条（禁止事項）
        </Heading>
        <Text fontSize='lg'>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはならないものとします。</Text>
        <OrderedList pl={6}>
          <ListItem fontSize='lg'>本サービスの運営を妨げる行為</ListItem>
          <ListItem fontSize='lg'>当社または第三者の知的財産権を侵害する行為</ListItem>
          <ListItem fontSize='lg'>当社または第三者のプライバシーを侵害する行為</ListItem>
          <ListItem fontSize='lg'>犯罪行為、公序良俗に反する行為、またはそれらに該当すると当社が判断する行為</ListItem>
          <ListItem fontSize='lg'>本規約に違反する行為</ListItem>
        </OrderedList>
        <Heading as='h3' fontSize='2xl'>
          第5条（料金）
        </Heading>
        <Text fontSize='lg'>ユーザーは、本サービスを利用するために、当社が定める料金を支払うものとします。 当社は、料金の変更をする場合があります。料金の変更は、本サービスのウェブサイト上で告知した時点から適用されます。</Text>
        <Heading as='h3' fontSize='2xl'>
          第6条（免責事項）
        </Heading>
        <Text fontSize='lg'>
          当社は、本サービスの提供について、事前の通知なしに中断または停止することができます。また、当社は、本サービスの提供について、適宜修正、変更することができます。 当社は、本サービスの利用により生じた損害について、一切の責任を負いません。
          当社は、クリエイターがアップロードした映画に関する著作権侵害等のクレームについて、一切の責任を負いません。
        </Text>
        <Heading as='h3' fontSize='2xl'>
          第7条（準拠法・裁判管轄）
        </Heading>
        <Text fontSize='lg'>本規約の準拠法は日本法とします。また、本サービスに関して紛争が生じた場合には、当社の所在地を管轄する裁判所を専属的合意管轄とします。</Text>
        <Text pt='8'>更新日:2023/4/3</Text>
      </Stack>
    </Stack>
  );
};
