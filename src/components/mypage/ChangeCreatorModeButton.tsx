import { Box, Button, Card, CardBody, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useToasts } from 'hooks/useToasts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'redaxios';

export const ChangeCreatorModeButton = () => {
  const user = useUser();
  const { errorToast } = useToasts();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeCreatorMode = async () => {
    setIsLoading(true);
    try {
      if (!user) return;
      const { data } = await axios.post('/api/stripe/createConnectedAccount', {  id: user.id, email: user.email });
      push(data.url);
    } catch (error) {
      errorToast({ title: 'クリエイターモードへの変更に失敗しました。' });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Card bgColor='black'>
        <CardBody>
          <Box as='button' width='100%' textAlign='left' bgColor='black' color='white' fontWeight='bold' fontSize='xl' onClick={onOpen}>
            クリエイターモードへ変更
          </Box>
          <Divider />
          <Text color='gray'>クリエイターモードは作品の公開や管理など、クリエイターのための機能が開放されるモードです。作品を公開するためには、クリエイターモードする必要があります。</Text>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={4}>一度クリエイターモードに変更すると通常アカウントに戻すことは出来ません。<br/>クリエイターモードに変更してよろしいですか？<br/>※変更のためにstripeのサイトに移動します。</ModalBody>
          <ModalFooter>
            <Button colorScheme='blackAlpha' mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button isLoading={isLoading} onClick={changeCreatorMode}>
              クリエイターモードへ変更
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
