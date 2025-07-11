import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="w-full max-w-xs sm:max-w-md mx-4 p-6 text-center text-red-500 border border-red-500 bg-black rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Something Went Wrong.
            </h2>
            <button
              className="mt-4 border px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800 transition"
              onClick={() => location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
