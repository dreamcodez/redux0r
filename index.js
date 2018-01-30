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
        case 'LISTEN':
            return freeze({
                ...state,
                listenStatus: 'initializing',
                listenPort: action.port
            })
        default:
            return state
    }
}

function listen(port) {
    doListen(port)
    return { type: 'LISTENING', port port };
}


// https://github.com/koajs/koa/issues/659
// https://www.npmjs.com/package/server-destroy
function doListen(port) {
    const app = new Koa()
    const server = http.createServer(app.callback())
    server.listen(port)
    destroyable(server)
    console.log(`Listening on ${port}...`)
    return server
}

const store = createStore(redux0r)

store.subscribe(() =>
  console.log(store.getState())
)
store.dispatch(listen(3000))
