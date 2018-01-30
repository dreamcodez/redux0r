import http from 'http'
import destroyable from 'server-destroy'
import Koa from 'koa'
import { createStore } from 'redux'
import freeze from 'deep-freeze'

const defaultState = freeze({
    listenStatus: 'down',
    port: 3000
})

function redux0r(state = defaultState, action) {
    switch (action.type) {
        case 'LISTEN':
            return freeze({
                ...state,
                listenStatus: 'initializing',
                port: action.port
            })
        default:
            return state
    }
}

const store = createStore(redux0r)
store.subscribe(() =>
  console.log(store.getState())
)

function listen(port) {
    { type: 'LISTEN', port }
}

a(3000)

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

listen(3000)
