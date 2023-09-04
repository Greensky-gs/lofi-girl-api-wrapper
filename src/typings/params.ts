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

export type changeType = 'stationAdd' | 'stationRemove' | 'commentUpdate' | 'commentDelete' | 'stationRename';
export type anyChange = stationAdd | stationRemove | commentUpdate | commentDelete | stationRename;

export type register = {
    port: string | number;
    id: string;
}
export type connection = {
    port: string;
    id: string;
}
export type change<T extends changeType> = T extends 'stationAdd' ? stationAdd : T extends 'stationRemove' ? stationRemove : T extends 'commentUpdate' ? commentUpdate : T extends 'commentDelete' ? commentDelete : T extends 'stationRename' ? stationRename : never