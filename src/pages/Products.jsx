import ProductCard from "../components/ProductCard";
import { products } from "../utils/products";

function Products() {
  return (
    <div className="p-5 bg-[#ffc155]">
      <h2 className="text-2xl font-bold mb-4">Products Page</h2>
      <div className="flex gap-10 justify-between flex-wrap p-20">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
