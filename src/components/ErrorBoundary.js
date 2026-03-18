import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#0b0f14] text-white">
                    <div className="w-[500px] p-8 glass-3d rounded-xl border border-red-500/30">
                        <h1 className="text-3xl text-red-400 mb-4">Something went wrong.</h1>
                        <p className="text-gray-400 mb-6 font-mono text-sm break-all">
                            {this.state.error?.toString()}
                        </p>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
