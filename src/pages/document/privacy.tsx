import { Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";

export default () => {
  return (
    <>
      <Stack width="90%" margin="auto" pt={6} pb={6}>
        <Heading as="h2" fontSize="5xl">
          プライバシーポリシー
        </Heading>
        <Stack spacing="4">
          <Text fontSize="lg">当社は、映画の配信サービスを提供する上で、お客様の個人情報の保護に最大限の注意を払います。以下に、当社が取り扱うお客様の個人情報について、プライバシーポリシーを定めます。</Text>
          <Heading as="h3" fontSize="2xl">
            1. 収集する情報について
          </Heading>
          <Text fontSize="lg">当社は、映画の配信サービスを提供するために、お客様から以下の情報を収集します。</Text>
          <UnorderedList pl={6}>
            <ListItem fontSize="lg">お名前、住所、電話番号、メールアドレスなどの個人情報</ListItem>
            <ListItem fontSize="lg">クレジットカード情報などの決済情報</ListItem>
            <ListItem fontSize="lg">お客様が利用する端末情報、IPアドレス、Cookieなどの利用履歴情報</ListItem>
          </UnorderedList>
          <Heading as="h3" fontSize="2xl">
            2. 収集する情報の利用目的について
          </Heading>
          <Text fontSize="lg">当社は、お客様から収集した情報を以下の目的で利用します。</Text>
          <UnorderedList pl={6}>
            <ListItem fontSize="lg">お客様に対するサービスの提供</ListItem>
            <ListItem fontSize="lg">お客様からのお問い合わせに対する回答</ListItem>
            <ListItem fontSize="lg">当社のサービスの改善および新サービスの開発</ListItem>
            <ListItem fontSize="lg">決済処理のための情報の利用</ListItem>
            <ListItem fontSize="lg">お客様に適切な情報を提供するためのマーケティング活動</ListItem>
          </UnorderedList>
          <Heading as="h3" fontSize="2xl">
            3. 収集する情報の第三者提供について
          </Heading>
          <Text fontSize="lg">当社は、以下の場合を除いて、お客様から収集した情報を第三者に提供することはありません。</Text>
          <UnorderedList pl={6}>
            <ListItem fontSize="lg">お客様の同意がある場合</ListItem>
            <ListItem fontSize="lg">法令に基づく場合</ListItem>
            <ListItem fontSize="lg">人の生命、身体または財産の保護のために必要な場合であって、お客様の同意を得ることが困難である場合</ListItem>
          </UnorderedList>
          <Heading as="h3" fontSize="2xl">
            4. 個人情報の管理について
          </Heading>
          <Text fontSize="lg">当社は、お客様から収集した情報を適切に管理し、漏洩、滅失、改ざん等が起こらないように最大限の注意を払います。</Text>
          <Heading as="h3" fontSize="2xl">
            5. お客様の権利について
          </Heading>
          <Text fontSize="lg">お客様は、当社に対して、以下の要求をすることができます。</Text>
          <UnorderedList pl={6}>
            <ListItem fontSize="lg">個人情報の開示、訂正、利用停止、削除等の要求</ListItem>
            <ListItem fontSize="lg">個人情報の利用に関するお問い合わせ</ListItem>
          </UnorderedList>
          <Heading as="h3" fontSize="2xl">
            6. プライバシーポリシーの変更について
          </Heading>
          <Text fontSize="lg">当社は、必要に応じて、プライバシーポリシーを改定することがあります。改定後のプライバシーポリシーは、当社のウェブサイト上に掲載し、お客様に通知することで、お客様に周知いたします。改定後のプライバシーポリシーは、改定した日から効力を発生します。</Text>
          <Heading as="h3" fontSize="2xl">
            7. 免責事項について
          </Heading>
          <Text fontSize="lg">当社は、法令に基づく場合を除き、お客様から収集した情報が漏洩、滅失、改ざん等された場合について、一切の責任を負いません。</Text>
          <Text fontSize="lg" pt="8">
            以上が、当社のプライバシーポリシーです。お客様には、本ポリシーに同意いただいた上で、当社のサービスをご利用いただきますようお願いいたします。
          </Text>
          <Text pt="8">更新日:2023/4/3</Text>
        </Stack>
      </Stack>
    </>
  );
}
