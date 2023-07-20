import { init_context } from "./controller_lib/init.js";
import { cp_update } from "./controller_lib/update.js";
const app = () => {
    cp_update();
    window.requestAnimationFrame(app);
};
window.onload = () => {
    init_context();
};
window.requestAnimationFrame(app);
