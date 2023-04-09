import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { Loading } from '@/old/components/compounds';
import { MdxContent, mdxComponents } from '@/old/components/mdx';
import { Layout, Seo } from '@/old/components/molecules';
import { Error, FourOhFour as FourOhFourSection } from '@/old/components/views';
import { useMDXComponent } from '@/old/hooks/use-mdx-component';
import type { Post } from '@/old/types';
import { buildOgImageUrl } from '@/old/utils/og';
import { getAllPosts } from '@/old/utils/posts/get-posts';
import type { Blog } from 'contentlayer/generated';

const mapContentLayerBlog = (post?: Blog): Post | null => {
  if (!post) return null;
  return { ...post } as Post;
};

interface PostPageProps {
  post: Blog;
  ogImageUrl?: string;
}

const PostPage: NextPage<PostPageProps> = (props) => {
  const { post: basePost, ogImageUrl } = props;
  const MdxComponent = useMDXComponent(basePost?.body?.code);
  const post = useMemo(() => mapContentLayerBlog(basePost), [basePost]);
  const router = useRouter();

  const renderContent = () => {
    if (!router.isFallback && !post?.slug) {
      return <FourOhFourSection />;
    }
    if (router.isFallback) {
      return <Loading css={{ m: 'auto' }} />;
    }
    if (!post || !MdxComponent) {
      return <Error />;
    }
    return (
      <MdxContent
        backText={'Back to blog posts list'}
        backHref={'/blog'}
        content={post as Post}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MdxComponent components={{ ...mdxComponents } as any} />
      </MdxContent>
    );
  };

  return (
    <Layout>
      <Seo
        title={`${post?.title} – Blog – Jahir Fiquitiva`}
        description={post?.excerpt || 'Blog post by Jahir Fiquitiva'}
        exactUrl={`https://jahir.dev/blog/${post?.slug}`}
        image={
          ogImageUrl ||
          `https://jahir.dev${post?.hero || '/static/images/brand/banner.png'}`
        }
        metaImageStyle={'summary_large_image'}
        keywords={[
          ...(post?.keywords || []),
          'tech',
          'software',
          'development',
          'thoughts',
          'blog',
          'content',
          'story',
          'storytelling',
          'news',
        ]}
        siteType={'blog'}
      />
      {renderContent()}
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPosts()
      .filter((it) => it.slug !== 'uses')
      .filter((post) => {
        const shouldRedirect = post && post.link && post.link.length > 0;
        return !shouldRedirect;
      })
      .map((p) => ({ params: { slug: p.slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getAllPosts()
    .filter((it) => it.slug !== 'uses')
    .find((post) => post.slug === params?.slug);
  if (!post) {
    return {
      props: {
        post: {
          body: {
            code: 'var Component = () => { return null }; return Component',
          },
        },
      },
    };
  }
  const shouldRedirect = post && post.link && post.link.length > 0;
  if (shouldRedirect) {
    return {
      redirect: {
        destination: post.link || '/',
        permanent: true,
      },
    };
  }
  return {
    props: {
      post,
      ogImageUrl: buildOgImageUrl('blog', post.title, `blog/${post.hero}`),
    },
  };
};
