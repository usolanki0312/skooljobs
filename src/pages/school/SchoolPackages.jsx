import { Package } from "lucide-react";

const SchoolPackages = () => (
  <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
    <Package size={40} className="mx-auto mb-4 text-primary/30" />
    <h2 className="text-2xl font-bold text-primary">Packages</h2>
    <p className="mt-2 text-sm text-slate-500">
      Pricing plans and payment gateway details coming soon. Contact support@skooljobs.in for early access.
    </p>
  </div>
);

export default SchoolPackages;
