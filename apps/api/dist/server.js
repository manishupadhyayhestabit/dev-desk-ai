"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT ?? 3000;
app.get('/_health', (_req, res) => res.send('ok'));
if (require.main === module) {
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`api listening on ${port}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map