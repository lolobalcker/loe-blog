// app/page.tsx
import { getSortedPostsData } from '@/lib/posts';
import Link from "next/link";
import Image from "next/image";
import { Post } from '@/types/post';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  return (
        <div className="flex flex-col p-6 gap-4">
            <div className="flex flex-col gap-4 items-center justify-center w-full">
                        {allPostsData.length > 0 ? (allPostsData.map(({ id, title, date, img, description }: Post) => (
                                <Link 
                                key={id} 
                                href={`posts/${id}`} 
                                className="flex flex-col p-4 border rounded-lg hover:bg-violet-400 w-full md:w-2/5 gap-4">
                                    <div className="flex flex-col md:flex-row gap-4 items-center">
                                        {img && <Image className="w-full md:w-36 h-24 object-cover rounded-lg" src={ img } alt={title} width={80} height={60}/>}
                                        <div>
                                            <h2 className="text-xl font-semibold"> { title } </h2>
                                            <p className="text-gray-600"> { description } </p>
                                        </div>
                                    </div>
                                    <p>{date ? new Date(date).toLocaleDateString("pt-BR") : 'Date not available'}</p>                                </Link>

                            ))): (
                                <p>No posts yet</p>
                            )
                        }
            </div>
        </div>
  );
}