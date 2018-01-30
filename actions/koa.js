
import http from 'http'
import destroyable from 'server-destroy'
import Koa from 'koa'
import freeze from 'deep-freeze'

let server
function listening() {
    return { type: 'LISTENING' };
}

function listen(port) {
    const state = store.getState()
    if (state.listenStatus === 'initializing') {
        console.error('cannot listen while initializing')
    } else {
        doListen(port)
        return { type: 'LISTEN', port };
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
setTimeout(shutdown, 1000)
setTimeout(listen.bind(0,3000), 3000)
setTimeout(shutdown, 5000)
