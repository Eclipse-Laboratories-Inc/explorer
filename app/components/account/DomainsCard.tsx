'use client';

import { Address } from '@components/common/Address';
import { ErrorCard } from '@components/common/ErrorCard';
import { LoadingCard } from '@components/common/LoadingCard';
import { useUserDomains } from '@utils/name-service';
import React from 'react';

import { DomainInfo } from '@/app/utils/domain-info';

import { useUserANSDomains } from '../../utils/ans-domains';

export function DomainsCard({ address }: { address: string }) {
    const [domainsANS, domainsANSLoading] = useUserANSDomains(address);

    if (domainsANSLoading && (!domainsANS || domainsANS.length === 0)) {
        return <LoadingCard message="Loading domains" />;
    } else if (!domainsANS) {
        return <ErrorCard text="Failed to fetch domains" />;
    }

    if (domainsANS.length === 0) {
        return <ErrorCard text="No domain name found" />;
    }

    domainsANS.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="card">
            <div className="card-header align-items-center">
                <h3 className="card-header-title">Owned Domain Names</h3>
            </div>
            <div className="table-responsive mb-0">
                <table className="table table-sm table-nowrap card-table">
                    <thead>
                        <tr>
                            <th className="text-muted">Domain Name</th>
                            <th className="text-muted">Name Service Account</th>
                        </tr>
                    </thead>
                    <tbody className="list">
                        {domainsANS.map(domain => (
                            <RenderDomainRow key={domain.address.toBase58()} domainInfo={domain} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function RenderDomainRow({ domainInfo }: { domainInfo: DomainInfo }) {
    return (
        <tr>
            <td>{domainInfo.name}</td>
            <td>
                <Address pubkey={domainInfo.address} link />
            </td>
        </tr>
    );
}
