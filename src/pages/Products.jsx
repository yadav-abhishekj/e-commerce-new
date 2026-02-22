import { useEffect, useReducer, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productService";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

function paginationReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };

    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.payload,
        page: 1, // reset page when searching
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_DATA":
      return {
        ...state,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
      };

    default:
      return state;
  }
}

function Products() {
  // for pagination, sorting, filtering, we can add more states here like:
  const initialState = {
    page: 1,
    limit: 8,
    totalPages: 1,
    totalItems: 0,
    keyword: "",
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(paginationReducer, initialState);
  const [products, setProducts] = useState([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState(state.keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(state.keyword);
    }, 600);

    return () => clearTimeout(timer);
  }, [state.keyword]);

  useEffect(() => {
    async function loadProducts() {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const res = await fetchProducts(
          `page=${state.page}&limit=${state.limit}&keyword=${state.keyword}`,
        );
        setProducts(res.data.products);

        dispatch({
          type: "SET_DATA",
          payload: {
            totalPages: res.data.total_pages,
            totalItems: res.data.filtered_count,
          },
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch products.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    loadProducts();
  }, [state.page, debouncedKeyword]);

  return (
    // Changed: Soft gray background instead of bright orange
    <>
      <section className="relative bg-gray-900 py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 ml-2">
              Collection
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Discover our premium range of products.
          </p>
        </div>
      </section>
      {/* <section className="bg-gray-50 py-6 px-6"></section> */}
      <section className="bg-white p-5 border-b border-gray-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={state.keyword}
              onChange={(e) =>
                dispatch({
                  type: "SET_KEYWORD",
                  payload: e.target.value,
                })
              }
              className="flex-1 px-6 py-4 rounded-2xl border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />

            {/* Optional Search Button */}
            {/* <button
              onClick={() =>
                dispatch({
                  type: "SET_PAGE",
                  payload: 1,
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              Search
            </button> */}
          </div>
          {/* Result Info */}
          <div className="mt-4 text-sm text-gray-500">
            Showing page {state.page} of {state.totalPages}
            {state.totalItems > 0 && (
              <span> • {state.totalItems} results found</span>
            )}
          </div>
          <Pagination
            page={state.page}
            totalPages={state.totalPages}
            setPage={(p) => dispatch({ type: "SET_PAGE", payload: p })}
          />
        </div>
      </section>
      <div className="max-w-7xl mx-auto">
        {state.loading ? (
          <div className="min-h-150 flex items-center justify-center bg-gray-50">
            <Spinner size={50} />
          </div>
        ) : state.error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-600">
            {state.error}
          </div>
        ) : (
          // Changed: Responsive Grid Layout
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-6 px-4
          "
          >
            {products.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No products available at the moment.
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
