import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-yellow-400 py-20 text-white text-center px-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold">
          Start Your Reading Journey Today
        </h2>

        <p className="mt-4 text-white/90">
          Discover amazing books and grow your knowledge.
        </p>

        <Link
          href="/books"
          className="inline-block mt-6 px-6 py-3 bg-white text-orange-500 font-semibold rounded-full hover:opacity-90"
        >
          Explore Books →
        </Link>

      </div>
    </section>
  );
}