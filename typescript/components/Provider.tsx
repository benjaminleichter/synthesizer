import * as React from 'react';
import * as Redux from 'redux';
import thunk from 'redux-thunk';

// Based on http://www.mattgreer.org/articles/typescript-react-and-redux/

interface IProvider<P> {
    appReducers? : Redux.Reducer<{}>;
    store? : any;
    services : Object;
    target : React.ComponentClass<P>;
}

export interface IExtraArguments {
    services : Object;
}

export class Provider extends React.Component<IProvider<{}>, any> {
    public static childContextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    public static createStore(appReducers : Redux.Reducer<{}>, services : Object) : Redux.Store<{}> {
        const extraArguments : IExtraArguments = {
            services,
        };
        return Redux.createStore(
            appReducers,
            Redux.applyMiddleware(
                thunk.withExtraArgument(extraArguments)
            )
        );
    }

    public store : Redux.Store<{}>;
    public target : React.ComponentClass<{}>;

    constructor(props : any) {
        super(props);

        if (typeof this.props.store !== 'undefined') {
            this.store = this.props.store;
        } else if (typeof this.props.appReducers !== 'undefined') {
            this.store = Provider.createStore(this.props.appReducers, this.props.services);
        } else {
            throw new Error('Provider requires appReducers or store');
        }
        this.target = this.props.target;
    }

    public getChildContext() {
        return {
            store: this.store,
        };
    }

    public render() {
        return React.createElement(this.target);
    }
}
