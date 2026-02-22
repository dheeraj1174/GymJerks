import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Dumbbell } from 'lucide-react';

const PaymentSuccess = () => {
    const { state } = useLocation();
    const plan = state?.plan || 'Unknown';
    const paymentId = state?.paymentId || 'N/A';
    const amount = state?.amount || 0;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full bg-dark/50 border border-neon/30 rounded-xl p-10 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-neon/10 p-5 rounded-full">
                        <CheckCircle className="h-16 w-16 text-neon" />
                    </div>
                </div>

                <h1 className="text-4xl font-heading font-bold text-neon mb-2">PAYMENT SUCCESSFUL!</h1>
                <p className="text-gray-400 mb-8">Welcome to the elite. Your transformation starts now.</p>

                <div className="bg-white/5 rounded-lg p-6 mb-8 text-left space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Plan</span>
                        <span className="font-bold text-white">{plan}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Amount Paid</span>
                        <span className="font-bold text-white">₹{amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Payment ID</span>
                        <span className="font-mono text-xs text-gray-300 break-all">{paymentId}</span>
                    </div>
                </div>

                <Link
                    to="/dashboard"
                    className="w-full flex justify-center items-center gap-2 py-3 bg-neon text-black font-bold rounded-lg hover:bg-white transition-colors uppercase"
                >
                    <Dumbbell className="h-5 w-5" />
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
