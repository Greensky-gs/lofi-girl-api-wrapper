import { change, changeType } from "./params";

export type receiveCallback = <T extends changeType>(type: T, change: change<T>) => void | unknown;
export type changeBody<T extends changeType> = {
    type: T,
    change: change<T>
}