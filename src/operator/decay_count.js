import {Observable} from "rxjs/Observable";

export function decayCount(bufferSize) {
    return (source) => Observable.create(subscriber => {

        if (!Number.isInteger(bufferSize)) subscriber.error(new Error(`Size param in decay operator should be a number`));

        let stack = [];

        return source.subscribe(line => {

                stack.push(line);

                if (stack.length === bufferSize) {
                    subscriber.next(stack);
                    stack.shift();
                }

            },
            e => subscriber.error(e),
            () => {

                for (const decayingStack of decayStack(stack))
                    subscriber.next(decayingStack);

                subscriber.complete();
            }
        );
    });
}

function* decayStack(stack) {
    let decayingStack = stack;

    while (decayingStack.length !== 0) {
        yield decayingStack;
        decayingStack.shift();
    }
}