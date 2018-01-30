import http from 'http'
import destroyable from 'server-destroy'
import Koa from 'koa'
import { createStore } from 'redux'
import freeze from 'deep-freeze'

const defaultState = freeze({
    listenStatus: 'down',
    listenPort: null
})

function redux0r(state = defaultState, action) {
    switch (action.type) {
        case 'LISTENING':
            return freeze({
                ...state,
                listenStatus: 'up'
            })
        case 'LISTEN':
            return freeze({
                ...state,
                listenStatus: 'initializing',
                listenPort: action.port
            })
        case 'SHUTDOWN':
            return freeze({
                ...state,
                listenStatus: 'down',
                listenPort: null
            })
        default:
            return state
    }
}


let server
function listening() {
    return store.dispatch({ type: 'LISTENING' });
}

function listen(port) {
    const state = store.getState()
    if (state.listenStatus === 'initializing') {
        console.error('cannot listen while initializing')
    } else {
        doListen(port)
        return store.dispatch({ type: 'LISTEN', port });
    }
}

function shutdown() {
    const state = store.getState()
    if (state.listenStatus === 'up') {
        server.destroy()
        return store.dispatch({ type: 'SHUTDOWN' });
    } else {
        console.error('cannot shutdown unless listenStatus is \'up\'')
        return
    }

}


// https://github.com/koajs/koa/issues/659
// https://www.npmjs.com/package/server-destroy
function doListen(port) {
    const app = new Koa()
    server = http.createServer(app.callback())
    server.listen(port, () => {
        store.dispatch({ type: 'LISTENING' })
    })
    destroyable(server)
}

const store = createStore(redux0r)

store.subscribe(() => console.log(store.getState()))
listen(3000)
setTimeout(() =>{
shutdown()
}, 1000)
