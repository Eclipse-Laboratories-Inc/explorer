import SupplyPageClient from './page-client';

export const metadata = {
    description: `Overview of the native token supply on Eclipse`,
    title: `Supply Overview | Eclipse`,
};

export default function SupplyPage() {
    return <SupplyPageClient />;
}
