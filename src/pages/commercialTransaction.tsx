import { Heading, Stack, Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react";

export default function () {
  return (
    <>
      <Stack width="90%" margin="auto" pt={6} pb={6}>
        <Heading as="h2" size="2xl">
          特定商取引法に基づく表示
        </Heading>
        <TableContainer whiteSpace="normal">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  事業者名
                </Th>
                <Td>うなじうなぎ合同会社</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  代表者
                </Th>
                <Td>手嶋庸介</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  所在地
                </Th>
                <Td>東京都港区南青山2-2-15</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  お問い合わせ先
                </Th>
                <Td>main@unajiunagi.com</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  販売分量
                </Th>
                <Td>各商品ご購入の最終確認画面にて表示します。</Td>
              </Tr>
              <Tr>
                <Th fontSize={20} color="white">
                  販売価格
                </Th>
                <Td>各商品ご購入の最終確認画面にて表示します。</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  販売価格以外の必要料金
                </Th>
                <Td>ウェブページの閲覧、商品のご購入、コンテンツダウンロード等に必要となるインターネット接続料金、通信料金等は、お客様のご負担となります。それぞれの料金は、お客様がご利用のインターネットプロバイダ、携帯電話会社等にお問い合わせください。</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  商品の申込み期間
                </Th>
                <Td>各商品のお申込み期間の設定がある場合には、その旨及びその内容について、各商品ご購入の最終確認画面にて表示します。</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  支払方法
                </Th>
                <Td>クレジットカード決済</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  販売価格の支払時期
                </Th>
                <Td>各カード会社の引落日</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  商品の引渡時期・サービスの提供時期
                </Th>
                <Td>当社の承認及び決済完了時点でサービスの提供が開始されます。</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  返品・キャンセルに関する特約
                </Th>
                <Td>決済手続完了後のキャンセルはお受けできません。 また、お支払い後のサービス代金の返金は行っておりません。</Td>
              </Tr>
              <Tr>
                <Th lineHeight="normal" fontSize={20} color="white">
                  解約について
                </Th>
                <Td>各サービスの利用規約又はサービスの説明ページにおいて表示します。</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
