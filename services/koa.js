import Promise from 'bluebird'
import { call, put, select } from 'redux-saga/effects'
import http from 'http'
import destroyable from 'server-destroy'
import Koa from 'koa'

let server
export function getServer() {
    return server
}

export function* listen(port) {
    const state = yield select()
    if (state.listenStatus === 'down') {
        yield put({ type: 'LISTEN' })
        yield call(doListen, port)
        yield put({ type: 'LISTENING', port })
    } else {
        console.error('cannot listen unless listenStatus is \'down\'')
    }
}

export function* shutdown() {
    const state = yield select()
    if (state.listenStatus === 'up') {
        yield put({ type: 'SHUTDOWN' })
        doShutdown()
        yield put({ type: 'SHUTDOWN_COMPLETE' })
    } else {
        console.error('cannot shutdown unless listenStatus is \'up\'')
    }
}

export function* restart() {
    const state = yield select()
    if (state.listenStatus === 'up') {
        yield shutdown()
        yield listen(state.listenPort)
    } else {
        console.error('cannot restart unless listenStatus is \'up\'')
    }
}
// https://github.com/koajs/koa/issues/659
// https://www.npmjs.com/package/server-destroy
async function doListen(port) {
    const app = new Koa()
    server = http.createServer(app.callback())
    await Promise.fromCallback(server.listen.bind(server, port))
    destroyable(server)
}

function doShutdown() {
    server.destroy()
    server = null
}