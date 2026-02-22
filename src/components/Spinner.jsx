export default function Spinner({ size = 40 }) {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ width: size, height: size }}
        className="border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
      />
    </div>
  );
}
