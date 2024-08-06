'use client';

import { ParsedAccountRenderer } from '@components/account/ParsedAccountRenderer';
import { Asset, ExtensionType, getExtension, getInternalAssetAccountDataSerializer } from '@nifty-oss/asset';
import React from 'react';

import { NiftyAssetMetadataCard } from '@/app/components/account/nifty-asset/AssetMetadataCard';

type Props = Readonly<{
    params: {
        address: string;
    };
}>;

function NiftyAssetMetadataCardRenderer({
    account,
    onNotFound,
}: React.ComponentProps<React.ComponentProps<typeof ParsedAccountRenderer>['renderComponent']>) {
    const data = account?.data.raw;
    const asset = data && getInternalAssetAccountDataSerializer().deserialize(data);

    if (asset) {
        const metadata = asset && getExtension(asset[0] as Asset, ExtensionType.Metadata);

        if (metadata && metadata.uri) {
            return <NiftyAssetMetadataCard asset={asset[0] as Asset} />;
        }
    }

    return onNotFound();
}

export default function MetaplexNFTMetadataPageClient({ params: { address } }: Props) {
    return <ParsedAccountRenderer address={address} renderComponent={NiftyAssetMetadataCardRenderer} />;
}