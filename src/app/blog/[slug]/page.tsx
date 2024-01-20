import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { Mdx } from '@/components/ui/blog/mdx';
import { allReadableBlogs } from '@/utils/blog';
import { createMetadata } from '@/utils/metadata';

import type { BlogPostPageContext } from './types';

export default function BlogPostPage(context: BlogPostPageContext) {
  const { slug } = context.params;
  const post = allReadableBlogs.find((b) => b.slug === slug);
  if (!slug || !post) return notFound();
  if (post.link) return redirect(post.link);
  return <Mdx code={post.body.code} />;
}

export const generateStaticParams = () =>
  allReadableBlogs
    .filter((post) => !post.link)
    .map((post) => ({ slug: post.slug }));

export const dynamicParams = false;

export function generateMetadata(
  context: BlogPostPageContext,
): Metadata | undefined {
  const { slug } = context.params;
  if (!slug) return undefined;
  const post = allReadableBlogs.find((b) => b.slug === slug);
  if (!post) return undefined;

  const { title, date, summary } = post;

  const metadata = createMetadata({
    title: `${title} | Blog – Jahir Fiquitiva`,
    description: summary || 'Blog post by Jahir Fiquitiva',
    exactUrl: `https://jahir.dev/blog/${slug}`,
    keywords: post.keywords,
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: 'article', publishedTime: date },
  };
}
