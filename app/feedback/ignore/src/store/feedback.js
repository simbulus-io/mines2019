import { log } from '@/logger';
export const feedback_state = {
    hello: 'Hello Mines 2019 Field Session',
};
const namespaced = true;
export const feedback = {
    namespaced,
    state: feedback_state,
    mutations: {
        hello: (state, message) => {
            state.hello = message;
        },
        // referenced by the other.ts file
        al: (state, message) => {
            state.al = message;
        },
        // Attempt to give the database to the feedback_api
        view_names: (state, message) => {
            state.view_names = message;
        },
        // snotes 5/29
        snotes: (state, message) => {
            state.snotes = message;
        },
        delete_snote: (state, message) => {
            // TODO: figure out what to do here
            state.delete_snote = message;
        }
    },
    actions: {
        hello: async (context, args) => {
            const rval = await fetch('http://localhost:5101/feedback/v1.0/hello');
            const state = await rval.json();
            log.info(`Got ${state.message} from the server`);
            context.commit('hello', state.message);
        },
        // Portion referenced by other.ts
        al: async (context, args) => {
            // references route defined in test_routes.ts::
            const rval = await fetch('http://localhost:5101/feedback/v1.0/al');
            const state = await rval.json();
            log.info(`Got ${state.message} from the server`);
            context.commit('al', state.message);
        },
        // Database attempt
        view_names: async (context, args) => {
            // references route defined in test_routes.ts::
            const rval = await fetch('http://localhost:5101/feedback/v1.0/view_names');
            const state = await rval.json();
            // log.info(`Got ${state.message} from the server`);
            context.commit('view_names', state.message);
        },
        // route to view all sticky notes (snotes)
        snotes: async (context, args) => {
            try {
                // references route defined in test_routes.ts::
                const rval = await fetch('http://localhost:5101/feedback/v1.0/snotes');
                const rval_json = await rval.json();
                log.info(`Got ${rval_json} from the server`);
                context.commit('snotes', rval_json.message);
            }
            catch (e) {
                log.error(e);
            }
        },
        delete_snote: async (context, idx) => {
            try {
                log.info('Accessing route to delete a sticky');
                // references route defined in test_routes.ts::
                const url = 'http://localhost:5101/feedback/v1.0/delete_snote?idx=' + idx; // + idx
                log.info('********** Getting url: ' + url);
                const rval = await fetch(url);
                const state = await rval.json();
                // log.info(`Got ${state.message} from the server`);
                context.commit('delete_snote', state.message);
            }
            catch (e) {
                log.error(e.message);
            }
        }
    }
};
//# sourceMappingURL=feedback.js.map