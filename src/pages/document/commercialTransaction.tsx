import { Heading, Stack, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useIsMobile } from 'hooks/useIsMobile';

export default () => {
  const isMobile = useIsMobile();

  return (
    <Stack width='90%' margin='auto' pt={6} pb={6}>
      <Heading size='xl'>特定商取引法に基づく表示</Heading>
      <TableContainer whiteSpace='normal'>
        <Table variant='simple' overflowX='scroll' width={isMobile ? '200%' : '100%'}>
          <Tbody>
            <Tr>
              <Td fontWeight='bold'>事業者名</Td>
              <Td>うなじうなぎ合同会社</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>代表者</Td>
              <Td>手嶋庸介</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>所在地</Td>
              <Td>東京都港区南青山2-2-15</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>お問い合わせ先</Td>
              <Td>main@unajiunagi.com</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>販売分量</Td>
              <Td>各商品ご購入の最終確認画面にて表示します。</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>販売価格</Td>
              <Td>各商品ご購入の最終確認画面にて表示します。</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>販売価格以外の必要料金</Td>
              <Td>ウェブページの閲覧、商品のご購入、コンテンツダウンロード等に必要となるインターネット接続料金、通信料金等は、お客様のご負担となります。それぞれの料金は、お客様がご利用のインターネットプロバイダ、携帯電話会社等にお問い合わせください。</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>商品の申込み期間</Td>
              <Td>各商品のお申込み期間の設定がある場合には、その旨及びその内容について、各商品ご購入の最終確認画面にて表示します。</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>支払方法</Td>
              <Td>クレジットカード決済</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>販売価格の支払時期</Td>
              <Td>各カード会社の引落日</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>商品の引渡時期・サービスの提供時期</Td>
              <Td>当社の承認及び決済完了時点でサービスの提供が開始されます。</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>返品・キャンセルに関する特約</Td>
              <Td>決済手続完了後のキャンセルはお受けできません。 また、お支払い後のサービス代金の返金は行っておりません。</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold'>解約について</Td>
              <Td>各サービスの利用規約又はサービスの説明ページにおいて表示します。</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
