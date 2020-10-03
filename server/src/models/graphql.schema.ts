
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class ShortUrl {
    fullUrl: string;
    shortCode?: string;
    addedTs: string;
}

export class Click {
    urlId: string;
    clickedTs: string;
    ipAddress?: string;
    location?: string;
    browser?: string;
}

export abstract class IQuery {
    abstract findAllShortUrls(): ShortUrl[] | Promise<ShortUrl[]>;

    abstract findShortUrl(shortCode: string): ShortUrl | Promise<ShortUrl>;

    abstract findAllClicks(): Click[] | Promise<Click[]>;

    abstract findAllClicksByShortUrl(urlId: string): Click[] | Promise<Click[]>;
}
