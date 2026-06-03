import { CreditCard } from "lucide-react";

const SchoolTransactions = () => (
  <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
    <CreditCard size={40} className="mx-auto mb-4 text-primary/30" />
    <h2 className="text-2xl font-bold text-primary">Transactions</h2>
    <p className="mt-2 text-sm text-slate-500">
      Package and payment transaction records will appear here once your first plan is activated.
    </p>
  </div>
);

export default SchoolTransactions;
