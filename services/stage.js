<div className="carousel rounded-box">
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
      alt="Burger" />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl overflow-hidden shadow-sm border-none bg-white"
              >
                {category.image?.url && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={category.image.url}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  {/* replaces {% url 'category-details' category.slug %} */}
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-[#2b2b2b] no-underline font-medium hover:text-[#c05a2a] transition-colors"
                  >
                    {category.name} <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>