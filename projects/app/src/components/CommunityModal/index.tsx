import React from 'react';
import { Button, ModalFooter, ModalBody } from '@chakra-ui/react';
import MyModal from '../MyModal';
import { useTranslation } from 'react-i18next';
import Markdown from '../Markdown';

const md = `
| 交流微信 |
| -----------------|
| 一起交流：asd7698fg|
`;

const CommunityModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <MyModal isOpen={true} onClose={onClose} title={t('home.Community')}>
      <ModalBody textAlign={'center'}>
        <Markdown source={md} />
      </ModalBody>

      <ModalFooter>
        <Button variant={'base'} onClick={onClose}>
          关闭
        </Button>
      </ModalFooter>
    </MyModal>
  );
};

export default CommunityModal;
