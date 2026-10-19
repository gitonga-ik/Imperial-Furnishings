import Link from 'next/link';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-8xl font-bold text-[#c05a2a] mb-4">404</h1>
        <p className="text-[#555] text-lg mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link href="/" className="btn-imperial">
          Go Home
        </Link>
      </div>
    </section>
  );
}
