import { TypedAction } from "data";
import { State } from "./model";


export const request = (): RequestAction => ({
	type: ActionTypes.REQUEST
});

export const synced = (): SyncedAction => ({
	type: ActionTypes.SYNCED
});

export const update = (delta: Partial<State>): UpdateAction => ({
	type: ActionTypes.UPDATE,
	payload: delta
});
