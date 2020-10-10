"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const expressLoader_1 = __importDefault(require("./loaders/expressLoader"));
const api_1 = __importDefault(require("./routes/api"));
const databaseLoader_1 = __importDefault(require("./loaders/databaseLoader"));
const tsyringe_1 = require("tsyringe");
const typeorm_1 = require("typeorm");
class App {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server = express_1.default();
            const routers = this.getRouters();
            const database = yield databaseLoader_1.default();
            if (!database) {
                throw new Error('Failed to connect to database');
            }
            tsyringe_1.container.registerInstance(typeorm_1.Connection, database);
            expressLoader_1.default(this.server, routers);
        });
    }
    getRouters() {
        return [
            { path: '/api', router: api_1.default },
        ];
    }
}
exports.default = App;
