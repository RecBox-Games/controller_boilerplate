import { init_context } from "./controller_lib/init.js";
import { cp_update } from "./controller_lib/update.js";

const app = () => {
    cp_update();
    // console.log("Hello");
    window.requestAnimationFrame(app);
};
window.onload = () => {
    init_context();
};
window.requestAnimationFrame(app);
// TODO: add layer to drawable & sort it before rendering + render functions
// TODO: Need an input interface / class to collecet input events in a queue or something similar.
