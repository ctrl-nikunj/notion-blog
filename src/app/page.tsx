import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { getAllPosts } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import DotGrid from "@/components/DotGrid";

export const revalidate = 600; // or 86400 for 1 day

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="relative min-h-screen bg-zinc-950 font-sans selection:bg-zinc-800 selection:text-zinc-100">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
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

      <main className="relative z-10 container mx-auto px-6 py-20">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
            Nikunj's Blog Page
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Powered by Notion. Developed on Next.js.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="block group h-full">
              <Card className="h-full bg-zinc-900/50 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/80 hover:scale-105 transition-all duration-500 overflow-hidden flex flex-col">
                <CardHeader className="p-0">
                  {post.cover ? (
                    <div className="relative w-full -mt-6 aspect-video">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        loading="lazy"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-zinc-800 -mt-6 flex items-center justify-center">
                      <span className="text-zinc-600 text-sm">No Cover</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-start">
                  <CardTitle className="text-xl text-zinc-100 font-semibold mb-2 group-hover:text-white transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-500 text-xs uppercase tracking-wider font-medium gap-1 flex flex-wrap">
                    {post.tags.map((tag) =>(
                      <span key={tag} className="p-1 bg-zinc-700 text-zinc-100 font-light rounded mr-1">{tag}</span>
                    ))}
                  </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                  <CardDescription className="text-zinc-500 text-xs uppercase tracking-wider font-medium">
                    {post.date || 'No Date'}
                  </CardDescription>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-zinc-900 py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Notion Blog. Built with Next.js 15.
          </p>
        </div>
      </footer>
    </div>
  );
}
