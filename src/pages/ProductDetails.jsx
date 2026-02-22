import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById, fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import useCartContext from "../hooks/useCartHook";
import Spinner from "../components/Spinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useCartContext();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const res = await fetchProductById(id);
        const currentProduct = res.data.product;
        setProduct(currentProduct);

        // Fetch related products (same category, exclude current)
        const relatedCategory = await fetchProducts(
          `page=1&limit=5&keyword=${currentProduct.category.split(" ")[0]}`,
        );

        setRelatedProducts(
          relatedCategory.data.products.filter((p) => p._id !== id),
        );
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  if (loading)
    return (
      <div className="min-h-150 flex items-center justify-center bg-gray-50">
        <Spinner size={50} />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600">
        {error}
      </div>
    );

  if (!product) return null;

  return (
    <div className="slide-in bg-white min-h-screen">
      <pre className="flex justify-center items-center gap-2 m-6">
        The product image can be same as current, but its not the same based on
        the id
      </pre>
      <section className="relative bg-gray-900 py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            {product.name}
          </h1>

          <div className="mt-4 flex justify-center items-center gap-4 text-gray-300">
            <span className="text-yellow-400">⭐ {product.ratings}</span>
            <span>({product.review_count} reviews)</span>
          </div>
        </div>
      </section>
      {/* PRODUCT CONTENT SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl p-10 shadow-sm">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-full object-contain h-100"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <p className="text-3xl font-black text-gray-900">
              ₹{product.price}
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="text-sm text-gray-500">
              Category: {product.category}
            </div>

            <div>
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            <button
              onClick={addToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-8">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
