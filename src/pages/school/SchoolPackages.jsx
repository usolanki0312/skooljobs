import { Package } from "lucide-react";

const SchoolPackages = () => (
  <div className="rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
    <Package size={40} className="mx-auto mb-4 text-primary/30" />
    <h2 className="text-2xl font-bold text-primary sm:text-3xl">Packages</h2>
    <p className="mt-2 text-sm text-slate-500">
      Pricing plans and payment gateway details coming soon. Contact support@skooljobs.in for early access.
    </p>
  </div>
);

export default SchoolPackages;
