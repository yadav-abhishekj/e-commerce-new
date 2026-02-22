function Pagination({ page, totalPages, setPage }) {
  return (
    <>
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-xl border disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-4 py-2 rounded-xl border ${
                page === pageNumber ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-xl border disabled:opacity-40"
        >
          Next
        </button>
      </div>
      <pre className="flex justify-center items-center gap-2 mt-6">
        The product image can be same as current, but its not the same based on
        the id
      </pre>
    </>
  );
}

export default Pagination;
