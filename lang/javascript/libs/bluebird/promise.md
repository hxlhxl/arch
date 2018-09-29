

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField  = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString
Promise.prototype.caught
Promise.prototype.reflect
Promise.prototype.then
Promise.prototype.done
Promise.prototype.spread
Promise.prototype.toJSON
Promise.prototype.all
Promise.prototype.error

Promise.prototype._then
Promise.prototype._length
Promise.prototype._isFateSealed
Promise.prototype._isFollowing
Promise.prototype._setLength
Promise.prototype._setFulfilled
Promise.prototype._setRejected
Promise.prototype._setFollowing
Promise.prototype._setIsFinal
Promise.prototype._setFinal
Promise.prototype._unsetCancelled
Promise.prototype._setCancelled
Promise.prototype._setWillBeCancelled
Promise.prototype._setAsyncGuaranteed
Promise.prototype._receiverAt
Promise.prototype._promiseAt
Promise.prototype._fulfillmentHandlerAt
Promise.prototype._rejectionHandlerAt
Promise.prototype._boundValue
Promise.prototype._migrateCallback0
Promise.prototype._migrateCallbackAt
Promise.prototype._addCallbacks
Promise.prototype._proxy
Promise.prototype._resolveCallback
Promise.prototype._rejectCallback
Promise.prototype._settlePromiseFromHandler
Promise.prototype._target
Promise.prototype._followee
Promise.prototype._setFollowee
Promise.prototype._settlePromise
Promise.prototype._settlePromiseLateCancellationObserver
Promise.prototype._settlePromiseCtx
Promise.prototype._settlePromise0
Promise.prototype._clearCallbackDataAtIndex
Promise.prototype._fulfill
Promise.prototype._reject
Promise.prototype._fulfillPromises
Promise.prototype._rejectPromises
Promise.prototype._settlePromises
Promise.prototype._settledValue




Promise.getNewLibraryCopy = module.exports
Promise.is
Promise.fromNode
Promise.all
Promise.cast
Promise.resolve
Promise.reject
Promise.setScheduler


Promise.Promise = Promise;
Promise.version = "3.5.1";

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};





