
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
    language?: string;
    userAgent?: string;
    country?: string;
    region?: string;
    city?: string;
}

export class User {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    authorized: boolean;
}

export abstract class IQuery {
    abstract findAllShortUrls(): ShortUrl[] | Promise<ShortUrl[]>;

    abstract findShortUrl(shortCode: string): ShortUrl | Promise<ShortUrl>;

    abstract findAllClicks(): Click[] | Promise<Click[]>;

    abstract findAllClicksByShortUrl(urlId: string): Click[] | Promise<Click[]>;

    abstract findUserByGoogleId(googleId: string): User | Promise<User>;

    abstract findAuthorizedUser(googleId: string, authorized: boolean): User | Promise<User>;
}
