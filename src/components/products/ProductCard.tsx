import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { categoryLabel, formatPrice } from "../../utils/product";

type ProductCardProps = {
  product: Product;
  onDelete: (id: number) => void;
  deletingId: number | null;
  /** Edit / delete — sellers and admins only */
  showManageActions?: boolean;
};

const ProductCard = ({
  product,
  onDelete,
  deletingId,
  showManageActions = false,
}: ProductCardProps) => {
  const inStock = (product.stockQuantity ?? 0) > 0;
  const isDeleting = product.id != null && deletingId === product.id;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ivory-dark bg-white/90 shadow-lg shadow-ruby-deep/5 transition-shadow hover:shadow-xl">
      <div className="relative aspect-4/3 overflow-hidden bg-ivory-warm">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-ivory-warm to-ivory-dark text-ink-muted/50">
            <span className="font-display text-4xl text-marigold/40">✦</span>
          </div>
        )}
        {product.handmade ? (
          <span className="absolute top-3 left-3 rounded-full bg-teal/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
            Handmade
          </span>
        ) : null}
        {product.festivalTag ? (
          <span className="absolute top-3 right-3 rounded-full bg-saffron/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
            {product.festivalTag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="rounded-full bg-marigold/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-saffron-deep uppercase">
            {categoryLabel(product.category)}
          </span>
          <span
            className={`text-[10px] font-semibold tracking-wide uppercase ${
              inStock ? "text-teal" : "text-ruby"
            }`}
          >
            {inStock ? `${product.stockQuantity} in stock` : "Out of stock"}
          </span>
        </div>

        <h2 className="font-display text-lg font-semibold text-ruby-deep line-clamp-2">
          {product.name}
        </h2>
        <p className="mt-1 text-sm text-ink-muted line-clamp-2">
          {product.description}
        </p>

        <p className="mt-3 font-semibold text-saffron-deep">
          {formatPrice(Number(product.price))}
        </p>

        {product.artisanName ? (
          <p className="mt-1 text-xs text-ink-muted">
            by {product.artisanName}
            {product.originState ? ` · ${product.originState}` : ""}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2 border-t border-ivory-dark/80 pt-4">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 rounded-lg border border-ivory-dark px-3 py-2 text-center text-xs font-semibold text-ruby-deep transition-colors hover:border-saffron hover:bg-ivory-warm/80"
          >
            View
          </Link>
          {showManageActions ? (
            <>
              <Link
                to={`/products/${product.id}/edit`}
                className="flex-1 rounded-lg border border-ivory-dark px-3 py-2 text-center text-xs font-semibold text-ruby-deep transition-colors hover:border-teal hover:bg-teal/5"
              >
                Edit
              </Link>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => product.id != null && onDelete(product.id)}
                className="rounded-lg border border-ruby/20 px-3 py-2 text-xs font-semibold text-ruby transition-colors hover:border-ruby hover:bg-ruby/5 disabled:opacity-50"
              >
                {isDeleting ? "…" : "Delete"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
