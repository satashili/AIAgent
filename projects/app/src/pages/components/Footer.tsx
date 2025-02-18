import React, { useMemo } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { feConfigs } from '@/web/common/store/static';
import { useTranslation } from 'react-i18next';
import Avatar from '@/components/Avatar';
import { useRouter } from 'next/router';
import CommunityModal from '@/components/CommunityModal';

const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const list = useMemo(
    () => [
      {
        label: t('home.Footer Product'),
        child: [
          {
            label: t('home.Footer FastGPT Cloud', { title: feConfigs.systemTitle }),
            onClick: () => {
              router.push('/app/list');
            }
          },
          {
            label: 'chatweb',
            onClick: () => {
              window.open('http://47.254.86.185:3101', '_blank');
            }
          },
          {
            label: 'AI_Database',
            onClick: () => {
              window.open('https://mjufvppb.cloud.sealos.io/chat/share?shareId=u7g2q8968mb23h1wa8ol8qvx&chatId=te7g413q7gvf', '_blank');
            }
          }
        ]
      },
      {
        label: t('home.Footer Developer'),
        child: [
          {
            label: t('home.Footer Git'),
            onClick: () => {
              window.open('https://devpress.csdn.net/aitech?utm_source=blog_detail', '_blank');
            }
          },
          {
            label: t('home.Footer Docs'),
            onClick: () => {
              window.open('https://zhuanlan.zhihu.com/p/649779973', '_blank');
            }
          }
        ]
      },
      {
        label: t('home.Footer Support'),
        child: [
          {
            label: t('home.Footer Feedback'),
            onClick: () => {
              window.open('http://47.254.86.185:3101', '_blank');
            }
          },
          {
            label: t('home.Community'),
            onClick: () => {
              onOpen();
            }
          }
        ]
      }
    ],
    [onOpen, t]
  );

  return (
    <Box
      display={['block', 'flex']}
      px={[5, 0]}
      maxW={'1200px'}
      m={'auto'}
      py={['30px', '60px']}
      flexWrap={'wrap'}
    >
      <Box flex={1}>
        <Flex alignItems={'center'}>
          <Avatar src="/icon/logo.svg" w={['24px', '30px']} />
          <Box
            className="textlg"
            fontSize={['xl', '2xl']}
            fontWeight={'bold'}
            ml={3}
            fontStyle={'italic'}
          >
            {feConfigs?.systemTitle}
          </Box>
        </Flex>
        <Box mt={5} fontSize={'sm'} color={'myGray.600'} maxW={'380px'} textAlign={'justify'}>
          {t('home.FastGPT Desc', { title: feConfigs.systemTitle })}
        </Box>
      </Box>
      {list.map((item) => (
        <Box key={item.label} w={'200px'} mt={[5, 0]}>
          <Box color={'myGray.500'}>{item.label}</Box>
          {item.child.map((child) => (
            <Box
              key={child.label}
              mt={[2, 3]}
              cursor={'pointer'}
              _hover={{ textDecoration: 'underline' }}
              onClick={child.onClick}
            >
              {child.label}
            </Box>
          ))}
        </Box>
      ))}
      {isOpen && <CommunityModal onClose={onClose} />}
    </Box>
  );
};

export default Footer;
