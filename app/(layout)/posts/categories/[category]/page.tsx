import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getPosts, getPostsTags } from "@/features/posts/post-manager";
import { PostCard } from "@/features/posts/PostCard";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import { FileQuestion } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: CategoryParams): Promise<Metadata> {
  return {
    title: `${SiteConfig.title}'s Blog about ${params.category}`,
    description: SiteConfig.description,
    openGraph: {
      title: `${SiteConfig.title}'s Blog about ${params.category}`,
      description: SiteConfig.description,
      url: `https://codeline.app/posts/categories/${params.category}`,
      type: "article",
    },
  };
}

type CategoryParams = PageParams<{
  category: string;
}>;

export default async function RoutePage(props: CategoryParams) {
  const tags = await getPostsTags();
  const posts = await getPosts([props.params.category]);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Blog post about {props.params.category}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: `/posts/categories/${tag}`,
            }}
          >
            <Badge
              variant={props.params.category === tag ? "default" : "outline"}
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </LayoutContent>

      {posts.length === 0 ? (
        <LayoutContent className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center rounded-lg border-2 border-dashed p-4 lg:gap-6 lg:p-8">
            <FileQuestion />
            <Typography variant="h2">No posts found</Typography>
            <Link className={buttonVariants({ variant: "link" })} href="/posts">
              View all posts
            </Link>
          </div>
        </LayoutContent>
      ) : (
        <LayoutContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </LayoutContent>
      )}
    </Layout>
  );
}
