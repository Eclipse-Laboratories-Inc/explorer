import { getHashedName, getNameAccountKey, getNameOwner } from '@bonfida/spl-name-service';
import { getDomainKey as getANSDomainKey, getNameOwner as getANSNameOwner } from '@onsol/tldparser';
import { Connection, PublicKey } from '@solana/web3.js';

// Address of the SOL TLD
export const SOL_TLD_AUTHORITY = new PublicKey('58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx');

async function getDomainKey(name: string, nameClass?: PublicKey, nameParent?: PublicKey) {
    const hashedDomainName = await getHashedName(name);
    const nameKey = await getNameAccountKey(hashedDomainName, nameClass, nameParent);
    return nameKey;
}

export interface DomainInfo {
    name: string;
    address: PublicKey;
}

export const hasDomainSyntax = (value: string) => {
    return value.length > 3 && value.split('.').length === 2;
};

// returns owner address and name account address.
export async function getANSDomainInfo(domainTld: string, connection: Connection) {
    const derivedDomainKey = await getANSDomainKey(domainTld.toLowerCase());
    try {
        // returns only non expired domains,
        const owner = await getANSNameOwner(connection, derivedDomainKey.pubkey);
        return owner
            ? {
                  address: derivedDomainKey.pubkey.toString(),
                  owner: owner.toString(),
              }
            : null;
    } catch {
        return null;
    }
}
