import tw from 'tailwind-styled-components';

import { Img } from '@/components/core/img';
import { Link } from '@/components/core/link/link';

export const PostCard = tw(Link)`
  flex
  flex-col
  p-10
  -mx-10
  gap-12
  rounded-10
  text-secondary-txt
  transition
  overflow-hidden
  transform
  group/post
  no-underline
  tablet-sm:p-12
  tablet-sm:-mx-12
  tablet-sm:flex-row
  tablet-lg:p-16
  tablet-lg:-mx-16
  tablet-lg:gap-16
  hocus:-translate-y-1
  hocus:outline-offset-0
  hocus:bg-[rgba(var(--post-color)/0.07)]
  hocus:no-underline
  hocus:text-primary-txt
  dark:hocus:bg-[rgba(var(--post-color)/0.14)]
`;

export const PostCardHero = tw(Img)`
  aspect-[5/2]
  h-auto
  rounded-4
  tablet-sm:mt-2
  tablet-sm:min-h-full
  tablet-sm:aspect-[4/3]
  tablet-sm:max-w-[160px]
`;

export const PostCardContent = tw.div`
  flex flex-col
  gap-4 flex-1
  tablet-sm:self-center
`;

export const PostTitle = tw.p`
  text-xs
  font-bold
  font-manrope
  text-primary-txt
  transition
  group-hocus/post:underline
  group-hocus/post:decoration-2
  group-hocus/post:text-[rgba(var(--post-text-color))]
`;

export const PostDescription = tw.p`
  font-normal
  text-2xs
  text-secondary-txt
  overflow-ellipsis
  line-clamp-1
  mobile-lg:line-clamp-2
  group-hocus/post:text-primary-txt
`;

export const PostStatsContainer = tw.div`
  flex
  items-center
  gap-x-8
  gap-y-6
  mt-4
  text-tertiary-txt
  text-4xs
  flex-wrap
  max-w-full
  tablet-sm:gap-x-12
  group-hocus/post:text-secondary-txt
`;
