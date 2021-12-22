import { combineReducers } from 'redux'

import optionsReducer from './features/options/optionsSlice'
import redditReducer from './features/reddit/redditSlice'
import videoReducer from './features/video/videoSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
    options: optionsReducer,
    reddit: redditReducer,
    video: videoReducer
})

export default rootReducer