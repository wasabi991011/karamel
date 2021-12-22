interface State {
	commentSort: string;
	default: "youtube" | "reddit";
	hideYoutubeComments: boolean;
	hideZeroCommentPosts: boolean;
	postSort: string;
}
const initialState: State = {
	commentSort: "best",
	default: "reddit",
	hideYoutubeComments: true,
	hideZeroCommentPosts: false,
	postSort: "top"
};


enum ActionTypes {
	REQUEST = "options/REQUEST",
	SYNCED = "options/SYNCED",
	UPDATE = "options/UPDATE"
}
interface TypedAction<T extends string> {
	readonly type: T;
	payload?: {};
}
interface RequestAction extends TypedAction<ActionTypes.REQUEST> {}
interface SyncedAction extends TypedAction<ActionTypes.SYNCED> {}
interface UpdateAction extends TypedAction<ActionTypes.UPDATE> {
	payload: Partial<State>;
}
type Action = RequestAction | SyncedAction | UpdateAction;


export default function todosReducer(state = initialState, action: Action): State {
  switch (action.type) {
      case ActionTypes.UPDATE: {
			return Object.assign({}, state, action.payload);
		}
    default:
      return state
  }
}