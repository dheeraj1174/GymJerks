import { useLocation, Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailed = () => {
    const { state } = useLocation();
    const reason = state?.reason || 'Your payment could not be processed.';

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full bg-dark/50 border border-red-500/30 rounded-xl p-10 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/10 p-5 rounded-full">
                        <XCircle className="h-16 w-16 text-red-500" />
                    </div>
                </div>

                <h1 className="text-4xl font-heading font-bold text-red-400 mb-2">PAYMENT FAILED</h1>
                <p className="text-gray-400 mb-4">Don't worry — you have not been charged.</p>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8">
                    <p className="text-red-400 text-sm">{reason}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/pricing"
                        className="w-full flex justify-center py-3 bg-neon text-black font-bold rounded-lg hover:bg-white transition-colors uppercase"
                    >
                        Try Again
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-full flex justify-center py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors uppercase"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
