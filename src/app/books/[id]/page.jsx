import books from "@/data/books.json";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BorrowButton from "@/components/Home/BorrowButton";

export default async function BookDetails({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const book = books.find(
    (b) => String(b.id) === String(id)
  );

  if (!book) notFound();

  return (
    <section className="min-h-screen bg-[#f6f2ea] py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        <div className="flex justify-center">
          <img
            src={book.image_url}
            alt={book.title}
            className="w-[360px] rounded-2xl shadow-xl"
          />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d1f15]">
            {book.title}
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            by <span className="font-semibold">{book.author}</span>
          </p>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-yellow-500 font-bold">
              ★ {book.rating}
            </span>
            <span className="text-gray-500 text-sm">
              {book.total_pages} pages
            </span>
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {book.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700">

            <div>
              <p className="font-semibold text-[#2d1f15]">Category</p>
              <p>{book.category}</p>
            </div>

            <div>
              <p className="font-semibold text-[#2d1f15]">Publisher</p>
              <p>{book.publisher}</p>
            </div>

            <div>
              <p className="font-semibold text-[#2d1f15]">Language</p>
              <p>{book.language}</p>
            </div>

            <div>
              <p className="font-semibold text-[#2d1f15]">Published</p>
              <p>{book.published_year}</p>
            </div>

            <div>
              <p className="font-semibold text-[#2d1f15]">Available</p>
              <p className="text-orange-500 font-semibold">
                {book.available_quantity} copies
              </p>
            </div>

          </div>

          <div className="mt-10">
            <BorrowButton />
          </div>
        </div>

      </div>
    </section>
  );
}