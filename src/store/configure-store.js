import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist';
import promiseMiddleware from 'redux-promise'

/**
 * 创建store
 * @param rootReducer
 * @returns {*}
 */
export default function (rootReducer) {
  const middleware = [promiseMiddleware]
  const enhancers = []

  // log 中间件
  if (__DEV__) {
    const logger = createLogger()
    middleware.push(logger)
  }

  // 合并中间件
  enhancers.push(applyMiddleware(...middleware))

  // persist rehydrate
  enhancers.push(autoRehydrate());
  const store = createStore(rootReducer, compose(...enhancers))
  return store
}
