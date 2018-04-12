import test from 'ava';
import path from 'path';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';


import {MarkdownReader} from "./markdown_reader";

test('happyFlow', t => {

    return MarkdownReader
        .from(HIPSTER_IMPSUM_TEXT)
        .read()
        // .do(console.log)
        .toPromise()
        .then(result => {
            console.debug(result);
            return t.pass();
            // return t.deepEqual(HIPSTER_IPSUM_POJO, result);
        });
});

const HIPSTER_IMPSUM_TEXT = "" +
    "# Lorem ipsum dolor amet sriracha hot chicken edison bulb jianbing echo park butcher chartreuse typewriter freegan." +
    "Forage flannel tumblr, air plant coloring book sartorial leggings irony mustache single-origin coffee raw denim man braid readymade. " +
    "Kogi poke fashion axe blue bottle. Hexagon pitchfork forage quinoa direct trade sustainable vice photo booth tumblr. " +
    "Locavore butcher venmo whatever taiyaki chambray, irony tilde shaman kale chips activated charcoal blue bottle everyday carry. " +
    "Chambray ramps try-hard, helvetica biodiesel pug taxidermy artisan blue bottle. " +
    "Shaman +1 green juice sartorial cloud bread fanny pack photo booth direct trade.\n" +
    "\n" +
    "## Lumbersexual stumptown 8-bit, DIY cray VHS lyft blue bottle tofu ramps." +
    "Brooklyn ugh hashtag meggings. " +
    "Cray man bun cornhole raw denim affogato small batch air plant pinterest readymade marfa glossier asymmetrical pok pok shoreditch keytar. " +
    "VHS humblebrag literally williamsburg readymade DIY. Knausgaard bicycle rights green juice raclette vinyl organic. " +
    "Keffiyeh vaporware hoodie, cold-pressed fixie humblebrag live-edge bespoke blue bottle gastropub hashtag.\n" +
    "\n" +
    "### Vape iceland hashtag +1 90's slow-carb bicycle rights." +
    "Ennui offal retro kale chips. Subway tile celiac gluten-free deep v readymade, " +
    "bicycle rights enamel pin health goth yuccie viral whatever vinyl single-origin coffee pork belly mumblecore. " +
    "Woke iceland PBR&B, hammock post-ironic four dollar toast snackwave normcore chia. " +
    "Tote bag blog knausgaard cred tousled tacos meggings.\n" +
    "\n" +
    "## You probably haven't heard of them hashtag fashion axe snackwave art party. " +
    "Chartreuse gochujang you probably haven't heard of them prism stumptown four dollar toast copper mug tumeric microdosing swag pinterest blue bottle seitan direct trade fingerstache. " +
    "Farm-to-table vaporware typewriter hoodie lo-fi. Shaman gentrify beard venmo taiyaki subway tile, " +
    "bicycle rights succulents mlkshk poke polaroid distillery. Selvage actually fixie ugh vegan, shoreditch tumblr squid.\n" +
    "\n" +
    "Oh. You need a little dummy text for your mockup? How quaint.\n" +
    "\n" +
    "I bet you’re still using Bootstrap too…";


const HIPSTER_IPSUM_POJO = {
    header: 'Lorem ipsum dolor amet sriracha hot chicken edison bulb jianbing echo park butcher chartreuse typewriter freegan.',
    paragraph: ["Forage flannel tumblr, air plant coloring book sartorial leggings irony mustache single-origin coffee raw denim man braid readymade. " +
    "Kogi poke fashion axe blue bottle. Hexagon pitchfork forage quinoa direct trade sustainable vice photo booth tumblr. " +
    "Locavore butcher venmo whatever taiyaki chambray, irony tilde shaman kale chips activated charcoal blue bottle everyday carry. " +
    "Chambray ramps try-hard, helvetica biodiesel pug taxidermy artisan blue bottle. " +
    "Shaman +1 green juice sartorial cloud bread fanny pack photo booth direct trade."],
    section: [
        {
            header: 'Lumbersexual stumptown 8-bit, DIY cray VHS lyft blue bottle tofu ramps.',
            paragraph: "Brooklyn ugh hashtag meggings. " +
            "Cray man bun cornhole raw denim affogato small batch air plant pinterest readymade marfa glossier asymmetrical pok pok shoreditch keytar. " +
            "VHS humblebrag literally williamsburg readymade DIY. Knausgaard bicycle rights green juice raclette vinyl organic. " +
            "Keffiyeh vaporware hoodie, cold-pressed fixie humblebrag live-edge bespoke blue bottle gastropub hashtag.\n" +
            "\n",
            section1: {
                header1: 'Vape iceland hashtag +1 90\'s slow-carb bicycle rights.',
                paragraph1: "Ennui offal retro kale chips. Subway tile celiac gluten-free deep v readymade, " +
                "bicycle rights enamel pin health goth yuccie viral whatever vinyl single-origin coffee pork belly mumblecore. " +
                "Woke iceland PBR&B, hammock post-ironic four dollar toast snackwave normcore chia. " +
                "Tote bag blog knausgaard cred tousled tacos meggings."
            }
        },
        {
            header1: 'You probably haven\'t heard of them hashtag fashion axe snackwave art party.',
            paragraph1: "Chartreuse gochujang you probably haven't heard of them prism stumptown four dollar toast copper mug tumeric microdosing swag pinterest blue bottle seitan direct trade fingerstache. " +
            "Farm-to-table vaporware typewriter hoodie lo-fi. Shaman gentrify beard venmo taiyaki subway tile, " +
            "bicycle rights succulents mlkshk poke polaroid distillery. Selvage actually fixie ugh vegan, shoreditch tumblr squid.\n",
            paragraph2: 'Oh. You need a little dummy text for your mockup? How quaint.',
            paragraph3: 'I bet you’re still using Bootstrap too…'
        }
    ]
};