export type user ={
    username?: string;
    id: string;
    displayName: string;
    email: string;
    token: string;
    imageUrl?: string;
}

export type loginCreds = {
    email: string;
    password: string;
}

export type registerCreds = {
    displayName: string;
    email: string;
    password: string;
}
