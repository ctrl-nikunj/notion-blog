import DotGrid from "@/components/DotGrid";
import MDXRenderer from "@/components/mdx-renderer";
import { getAllPosts, getPostBySlug } from "@/lib/notion";
import { ArrowDown } from "lucide-react";
import { Suspense } from "react";

type Prop = { params: Promise<{ slug: string }> };

export const revalidate = 600;

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map(p => ({ slug: p.id }));
}
export default async function PostPage({ params }: Prop) {
    const { slug } = await params;
    // find the page id by slug; you can add an index map or query DB for slug
    const post = await getPostBySlug(slug);
    if (!post) return <div className="max-w-3xl mx-auto py-16">Post not found.</div>;

    return (
        <div className="relative min-h-screen bg-zinc-950 font-sans selection:bg-zinc-800 selection:text-zinc-100">
            <div className="fixed inset-0 z-1 backdrop-blur-lg">
                <DotGrid
                    dotSize={2}
                    gap={20}
                    baseColor="#333"
                    activeColor="#555"
                    proximity={100}
                    shockRadius={120}
                    shockStrength={2}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>
            <main className="max-w-3xl relative mx-auto py-16 prose z-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <h1 className="text-6xl text-white font-bold mb-4">{post.title}</h1>

                    {post.date && (
                        <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                    )}

                    <MDXRenderer blocks={post.blocks} />
                </Suspense>
            </main>
            <div className="bottom-6 right-6 fixed z-50">
                <ArrowDown className="w-6 h-6 text-zinc-400 animate-bounce" />
            </div>
            <footer className="relative z-10 text-white py-6 text-center">
                <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Notion Blog</p>
            </footer>
        </div>
    );
}
