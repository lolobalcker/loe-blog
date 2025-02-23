import {getPostData, getSortedPostsData} from '@/lib/posts';
import { Metadata } from 'next';
 

export const metadata: Metadata = {
  title: "loe's blog",
  description: "my blog about art design and things i like",
  openGraph: {
    url: "https://lolobalcker.github.io/loe-blog/",
    type: "website",
    title: "loe's blog",
    description: "my blog about art design and things i like",
    images: [
      {
        url: "https://lolobalcker.github.io/loe-blog/sonic.gif",
        width: 1860,
        height: 1036,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "lolobalcker.github.io/loe-blog/", // corresponds to twitter:domain
    title: "loe's blog",
    description: "my blog about art design and things i like",
    images: ["https://lolobalcker.github.io/loe-blog/sonic.gif"],
  },
};

export function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.id,
    }));
}

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostPage({ params }: Props) {
    const { id } = await params;
    const postData = await getPostData(id);
    metadata.title = postData.title;

    metadata.description = postData.description;
    if (metadata.openGraph) {
        metadata.openGraph.title = postData.title || "loe's blog";
        metadata.openGraph.description = postData.description;
        if (metadata.openGraph.images && Array.isArray(metadata.openGraph.images) && metadata.openGraph.images.length > 0) {
            const firstImage = metadata.openGraph.images[0];
            if (typeof firstImage === 'object' && 'url' in firstImage) {
                firstImage.url = postData.img?.startsWith("http") ? postData.img : `https://lolobalcker.github.io${postData.img}` || "";
            }
        }
    }
    metadata.twitter!.title = postData.title;
    metadata.twitter!.description = postData.description;
    if (metadata.twitter && metadata.twitter.images && Array.isArray(metadata.twitter.images)) {
        metadata.twitter.images[0] = postData.img?.startsWith("http") ? postData.img : `https://lolobalcker.github.io${postData.img}` || "";
    }

    return (
        <main className="max-w-3xl mx-auto p-6">
            <div className="markdown-body mb-6 p-4 text-center rounded">
                <h1 className="text-4xl font-bold mb-2 capitalize">{postData.title}</h1>
                <p className="text-sm">
                Published on {new Date(postData.date).toLocaleDateString("pt-BR")}
                </p>
            </div>

            <article
                className="markdown-body p-6 rounded"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
            />
        </main>
    );
}
