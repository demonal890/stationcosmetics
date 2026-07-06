export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold font-heading text-foreground mb-4">
        Product: {params.slug}
      </h1>
      <p className="text-lg text-gray-600">
        Product detail page coming soon...
      </p>
    </div>
  );
}
