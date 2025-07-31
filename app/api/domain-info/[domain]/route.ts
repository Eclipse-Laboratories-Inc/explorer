import { Connection } from "@solana/web3.js";
import { NextResponse } from "next/server";

import { MAINNET_BETA_URL } from "@/app/utils/cluster";
import { getANSDomainInfo } from "@/app/utils/domain-info";

type Params = {
    params: {
        domain: string;
    };
};

export type FetchedDomainInfo = Awaited<ReturnType<typeof getANSDomainInfo>>;

export async function GET(_request: Request, { params: { domain } }: Params) {
    const connection = new Connection(MAINNET_BETA_URL);
    const domainInfo = await (getANSDomainInfo(domain, connection))

    return NextResponse.json(domainInfo, {
        headers: {
            // 24 hours
            "Cache-Control": "max-age=86400",
        },
    });
}
