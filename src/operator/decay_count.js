import {Observable} from "rxjs/Observable";

/**
 * Mix between a queue and a buffer, used for parsing large files.
 * The operator releases the entire queue every time.
 * Near completion the queue will shrink until completion.
 * @param bufferSize
 * @returns {function(*): *}
 */
export function decayCount(bufferSize) {
    return (source) => Observable.create(subscriber => {

        if (!Number.isInteger(bufferSize)) subscriber.error(new Error(`Size param in decay operator should be a number`));

        let queue = [];

        return source.subscribe(line => {

                queue.push(line);

                if (queue.length === bufferSize) {
                    subscriber.next(queue);
                    queue.shift();
                }

            },
            e => subscriber.error(e),
            () => {

                for (const decayingStack of decayQueue(queue))
                    subscriber.next(decayingStack);

                subscriber.complete();
            }
        );
    });
}

function* decayQueue(queue) {
    let decayingQueue = queue;

    while (decayingQueue.length !== 0) {
        yield decayingQueue;
        decayingQueue.shift();
    }
}