import { Heading, Img } from '@/components/core';
import { styled } from '~/stitches';

import { Reactions } from './Reactions';

export const Title = styled(Heading, {
  $$textShadowColor: '$colors$accent-dark',
  dark: { $$textShadowColor: '$colors$accent-dark' },
  mt: '$12',
  '@tablet-sm': {
    mt: '$16',
  },
  '@tablet-lg': {
    mt: '$20',
  },
});

export const Intro = styled('p', {
  fontSize: '$xs',
  color: '$text-tertiary',
  mb: '$24 !important',
});

export const ShareAndEdit = styled('div', {
  display: 'flex',
  gap: '$12',
  fontSize: '$2xs',
  color: '$text-tertiary',
  order: 2,
  '@tablet-md': {
    order: 1,
  },
});

export const ArticleFooter = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$$verticalContentPadding',
  boxSizing: 'border-box',
  mt: 'calc(-$$verticalContentPadding + $20)',
  '@tablet-md': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const ArticleHero = styled(Img, {
  overflow: 'hidden',
  variants: {
    cropHero: {
      true: {
        aspectRatio: '2 / 1',
        height: 'auto',
      },
    },
  },
});

export const MdxReactions = styled(Reactions, {
  order: 1,
  '@tablet-lg': {
    order: 2,
  },
});