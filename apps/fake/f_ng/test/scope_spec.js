
describe("Scope", function() {
    it("can be constructed and used as an object", function() {
        var scope = new Scope();
        scope.aProperty = 1;
        expect(scope.aProperty).toBe(1);
    });
});

describe("digest", function() {
    var scope;
    beforeEach(function() {
        scope = new Scope();
    });
    it("calls the listener function of a watch on first $digest", function() {
        var watchFn = function() {return 'wat';};
        var listenerFn = jasmine.createSpy();
        scope.$watch(watchFn, listenerFn);

        scope.$digest();
        expect(listenerFn).toHaveBeenCalled();
    });

    it("calls the watch function with the scope as the argument", function() {
        var watchFn = jasmine.createSpy();
        var listenerFn = function() {};
        scope.$watch(watchFn, listenerFn);

        scope.$digest();
        expect(watchFn).toHaveBeenCalledWith(scope);
    });

    it("calls the listener function when the watched value changes", function() {

        scope.someValue = 'a';
        scope.counter = 0;

        scope.$watch(
            function(scope) {return scope.someValue},
            function(newValue, oldValue, scope) { scope.counter++; }
        );
        
        expect(scope.counter).toBe(0);
        scope.$digest();
        expect(scope.counter).toBe(1);
        scope.$digest();
        expect(scope.counter).toBe(1);
        scope.someValue = 'b';
        expect(scope.counter).toBe(1);
        scope.$digest();
        expect(scope.counter).toBe(2);
    });

    it("calls listener when watch value is first undefined", function() {
        scope.counter = 0;
        scope.$watch(
            function(scope) { return scope.someValue; },
            function(newValue, oldValue, scope) { scope.counter++; }
        );
        scope.$digest();
        expect(scope.counter).toBe(1);
    });

    it("calls listener with new value as old value the first time", function() {
        scope.someValue = 123;
        var oldValueGiven;

        scope.$watch(
            function(scope) { return scope.someValue; },
            function(newValue, oldValue, scope) { oldValueGiven = oldValue; }
        );
        scope.$digest();
        expect(oldValueGiven).toBe(123);
    });

    it("may have watchers that omit the listener function", function() {
        var watchFn = jasmine.createSpy().and.returnValue('something');
        scope.$watch(watchFn);

        scope.$digest();
        expect(watchFn).toHaveBeenCalled();
    });

    it("triggers chained watchers in the same digest", function() {
        scope.name = 'jane';
        scope.$watch(
            function(scope) { return scope.nameUpper; },
            function(newValue, oldValue, scope) {
                if (newValue) {
                    scope.initial = newValue.substring(0, 1) + '.';
                }
            }
        );

        scope.$watch(
            function(scope) { return scope.name; },
            function(newValue, oldValue, scope) {
                if (newValue) {
                    scope.nameUpper = newValue.toUpperCase();
                }
            }
        );

        scope.$digest();
        expect(scope.initial).toBe('J.');

        scope.name = 'bob';
        scope.$digest();
        expect(scope.initial).toBe('B.');
    });

    it("give up on the watches after 10 iteration", function() {
        // 这个测试用例会陷入死循环，导致testem无法正常工作
        scope.counterA = 0;
        scope.counterB = 0;

        scope.$watch(
            function(scope) { return scope.counterA; },
            function(newValue, oldValue, scope) {
                scope.counterB++;
            }
        );

        scope.$watch(
            function(scope) { return scope.counterB; },
            function(newValue, oldValue, scope) {
                scope.counterA++;
            }
        );

        expect((function() { scope.$digest(); })).toThrow();
    });

    it("ends the digest when the last watch is clean", function() {
        scope.array = _.range(100);
        var watchExecutions = 0;

        _.times(100, function(i) {
            scope.$watch(
                function(scope) {
                    watchExecutions++;
                    return scope.array[i];
                }
            ),
            function(newValue, oldValue, scope) {

            }
        });

        scope.$digest();
        expect(watchExecutions).toBe(200);

        /**
         * $$lastDirtyWatch表示watcher数组中最后一个为脏值
         * 第一次$digest:
         *   $$lastDirtyWatch为null
         * 第二次$digest:
         *   首次$digestOnce, $$lastDirtyWatch为array[1]的watcher
         *   二次$digestOnce, clean且watcher相同，终止watcher中剩余的脏值检测
         */
        scope.array[0] = 420;
        scope.array[1] = 420;
        scope.$digest();
        expect(watchExecutions).toBe(302);
    });
});
