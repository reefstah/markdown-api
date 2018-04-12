import test from 'ava';
import 'rxjs/add/operator/toPromise';

import {ParagraphParser} from "./paragraph";

test('happyFlow', t => {

    const HIPSTER_IMPSUM_TEXT = "Single-origin coffee YOLO woke plaid la croix asymmetrical, " +
        "authentic palo santo health goth locavore vice next level. " +
        "Small batch celiac artisan beard, chillwave 8-bit lo-fi fashion axe. " +
        "Craft beer gastropub la croix, humblebrag disrupt live-edge tumeric. " +
        "Hexagon tattooed chambray, wayfarers semiotics mustache helvetica cloud bread neutra church-key brunch cray hell of unicorn. " +
        "Readymade biodiesel try-hard semiotics. Vexillologist blog four dollar toast, " +
        "fanny pack shoreditch lumbersexual 90's kogi put a bird on it freegan salvia authentic activated charcoal roof party.\n" +
        "\n" +
        "Oh. You need a little dummy text for your mockup? How quaint.\n" +
        "\n" +
        "I bet you’re still using Bootstrap too…";

    const HIPSTER_IPSUM_PARAGRAPH = "Single-origin coffee YOLO woke plaid la croix asymmetrical, " +
        "authentic palo santo health goth locavore vice next level. " +
        "Small batch celiac artisan beard, chillwave 8-bit lo-fi fashion axe. " +
        "Craft beer gastropub la croix, humblebrag disrupt live-edge tumeric. " +
        "Hexagon tattooed chambray, wayfarers semiotics mustache helvetica cloud bread neutra church-key brunch cray hell of unicorn. " +
        "Readymade biodiesel try-hard semiotics. Vexillologist blog four dollar toast, " +
        "fanny pack shoreditch lumbersexual 90's kogi put a bird on it freegan salvia authentic activated charcoal roof party.";

    return new ParagraphParser()
        .parse(HIPSTER_IMPSUM_TEXT)
        .toPromise()
        .then(result => {
            t.deepEqual(result.text, HIPSTER_IPSUM_PARAGRAPH);
        });
});
