import { Home } from '../pages/Home';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function Page() {
  return (
    <ErrorBoundary fallback={
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto mt-10">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Home Page</h2>
        <p className="text-red-600 mb-4">
          We encountered an error while loading the home page. Please try again later.
        </p>
      </div>
    }>
      <Home />
    </ErrorBoundary>
  );
}
