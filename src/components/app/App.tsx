import { push } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Action, Dispatch, bindActionCreators } from "redux";

import { returnOf } from "common/util";
import { State } from "data";
import { request as requestOptions } from "data/options";
import { requestMe } from "data/reddit";

import { ToggleButton } from "components/toggle-button";
import { VideoListener } from "components/video-listener";
import { Comments } from "pages/comments";
import { Options } from "pages/options";
import style from "./App.scss";

const noop = () => null!;

class App extends React.Component<AppProps & ReduxProps, {}> {
	private hasSwitched = false;

	componentDidMount() {
		this.props.requestMe();
		this.props.requestOptions();
		this.props.push(`/${this.props.default}`);
	}

	componentWillReceiveProps(nextProps: ReduxProps) {
		// If there are no posts for the next video, switch to YouTube comments.
		if (!nextProps.postsLoading && nextProps.posts.length === 0) {
			this.props.push("/youtube");
			this.hasSwitched = true;
		} else if (this.hasSwitched) {
			this.props.push(`/${this.props.default}`);
			this.hasSwitched = false;
		}
	}

	render() {
		return (
			<main className={style.container}>
				<VideoListener />
				<ToggleButton />

				<div
					style={{
						display:
							this.props.path === "/youtube" ? "none" : "block",
						width: "100%"
					}}
				>
					<Route path="/" component={Comments} />
					<Route exact path="/youtube" component={noop} />
					<Route exact path="/options" component={Options} />
				</div>
			</main>
		);
	}
}

export interface AppProps {}

const mapStateToProps = (state: State) => ({
	default: state.options.default,
	path: state.router.location.pathname,
	posts: state.reddit.posts,
	postsLoading: state.reddit.postsLoading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
	bindActionCreators(
		{
			push,
			requestMe,
			requestOptions
		},
		dispatch
	);

type ReduxProps = typeof StateProps & typeof DispatchProps;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

const ConnectedApp = connect<typeof StateProps, typeof DispatchProps, AppProps>(
	mapStateToProps,
	mapDispatchToProps
)(App);
export { ConnectedApp as App };
