import test from 'ava';

import {isNotBlankLine} from "./blank_line";

test('happyFlow', t => t.true(!isNotBlankLine('\n')));
