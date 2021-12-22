import * as options from "./options";
import * as reddit from "./reddit";
import * as video from "./video";

export interface State {
	reddit: reddit.State;
	options: options.State;
	video: video.State;
}

export interface TypedAction<T extends string> {
	readonly type: T;
	payload?: {};
}

export default {
	reddit: reddit.reducer,
	options: options.reducer,
	video: video.reducer
};
