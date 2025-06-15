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
const express_1 = __importDefault(require("express"));
const todos_router_1 = require("./todos/todos.router");
// 
const app = (0, express_1.default)();
// middleware parser
app.use(express_1.default.json());
// router
const userRouter = express_1.default.Router();
//** */ 
app.use("/todos", todos_router_1.todosRouter);
app.use("/users", userRouter);
// 
app.get("/", (req, res) => {
    res.send("Server is running");
});
// error handling
app.get('/', (req, res, next) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header,
    });
    next();
});
app.get('/error', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("welcome to todos app");
    }
    catch (err) {
        next(err);
    }
}));
// if route not found
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not found" });
});
// 
app.use((error, req, res, next) => {
    if (error) {
        console.log("Error", error);
        res.status(400).json({ message: "Something went Wrong from global error handler", error });
    }
});
exports.default = app;
