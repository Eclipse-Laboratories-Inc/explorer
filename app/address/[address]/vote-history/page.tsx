import getReadableTitleFromAddress, { AddressPageMetadataProps } from '@utils/get-readable-title-from-address';
import { Metadata } from 'next/types';

import VoteHistoryPageClient from './page-client';

type Props = Readonly<{
    params: {
        address: string;
    };
}>;

export async function generateMetadata(props: AddressPageMetadataProps): Promise<Metadata> {
    return {
        description: `Vote history of the address ${props.params.address} by slot on Eclipse`,
        title: `Vote History | ${await getReadableTitleFromAddress(props)} | Eclipse`,
    };
}

export default function VoteHistoryPage(props: Props) {
    return <VoteHistoryPageClient {...props} />;
}
