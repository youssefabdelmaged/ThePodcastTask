"use client";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Oops! Algo deu errado
              </h2>
              <p className="text-text-secondary mb-4">
                Não foi possível carregar o conteúdo. Tente recarregar a página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-button-primary text-text-white rounded-md hover:bg-button-primary-hover transition-colors"
              >
                Recarregar página
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
