import {Observable} from "rxjs/Observable";

export class DecayingObservable {

    static from(lineObs, STACK_SIZE) {
        return Observable
            .create(obs => {

                let stack = [];

                lineObs
                    .subscribe(line => {

                            stack.push(line);

                            if (stack.length === STACK_SIZE) {
                                obs.next(stack.join('\n'));
                                stack.shift();
                            }

                        },
                        e => obs.error(e),
                        () => {
                            for (const decayingStack of decayStack(stack))
                                obs.next(decayingStack.join('\n'));

                            obs.complete();
                        }
                    )
            });
    }
}

function* decayStack(stack) {
    let decayingStack = stack;

    while (decayingStack.length !== 0) {
        yield decayingStack;
        decayingStack.shift();
    }
}