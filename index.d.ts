export type stationType = 'playlist' | 'radio';
export type emitter = { emitterId: string };

export type stationAdd = {
    name: string;
    type: stationType;
    url: string;
    emoji: string;
} & emitter;
export type stationRemove = {
    url: string;
} & emitter
export type commentUpdate = {
    url: string;
    comment: {
        comment: string | null;
        keywords: string[];
        userId: string;
    }
} & emitter
export type commentDelete = {
    url: string;
    userId: string;
} & emitter
export type stationRename = {
    url: string;
    name: string;
    emoji: string;
} & emitter;
export type recommendation = {
    url: string;
} & emitter

export type changeType = 'stationAdd' | 'stationRemove' | 'commentUpdate' | 'commentDelete' | 'stationRename' | 'recommendation';
export type anyChange = stationAdd | stationRemove | commentUpdate | commentDelete | stationRename | recommendation;

export type register = {
    port: string | number;
    id: string;
}
export type connection = {
    port: string;
    id: string;
}
export type change<T extends changeType> = T extends 'stationAdd' ? stationAdd : T extends 'stationRemove' ? stationRemove : T extends 'commentUpdate' ? commentUpdate : T extends 'commentDelete' ? commentDelete : T extends 'stationRename' ? stationRename : never

export type receiveCallback = <T extends changeType>(type: T, change: change<T>) => void | unknown;

import { Express } from 'express'
export class Wrapper {
    private port: string;
    private id: string;
    private app: Express;
    private _onReceive: receiveCallback;

    constructor(data: connection & { apiPort: string; });

    public onReceive(callback: receiveCallback): this;
    public update<T extends changeType>(type: T, change: change<T>): Promise<void>;
    public unregister(): void;
}
