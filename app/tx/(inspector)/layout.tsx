import { Metadata } from 'next/types';
import React from 'react';

type Props = Readonly<{
    children: React.ReactNode;
    params: Readonly<{
        signature: string;
    }>;
}>;

export async function generateMetadata({ params: { signature } }: Props): Promise<Metadata> {
    if (signature) {
        return {
            description: `Interactively inspect the Eclipse transaction with signature ${signature}`,
            title: `Transaction Inspector | ${signature} | Eclipse`,
        };
    } else {
        return {
            description: `Interactively inspect Eclipse transactions`,
            title: `Transaction Inspector | Eclipse`,
        };
    }
}

export default function TransactionInspectorLayout({ children }: Props) {
    return children;
}
