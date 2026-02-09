import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productService";

function Products() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsFromAPI() {
      try {
        setLoading(true);
        const res = await fetchProducts();
        if (!res || res.length === 0) {
          setError("No products found.");
          return;
        }
        setProductData(res);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductsFromAPI();
  }, []);

  return (
    // Changed: Soft gray background instead of bright orange
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Our Collection
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Discover our premium range of products.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl animate-pulse text-gray-400 font-medium">
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-600">
            {error}
          </div>
        ) : (
          // Changed: Responsive Grid Layout
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productData.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
