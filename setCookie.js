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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_core_1 = __importDefault(require("puppeteer-core"));
var fs_1 = __importDefault(require("fs"));
var runPuppeteer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, cookies, _i, cookies_1, cookie, expires, text, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, 12, 13]);
                return [4 /*yield*/, puppeteer_core_1.default.launch({
                        executablePath: process.env.CHROME_BIN,
                        headless: false,
                        slowMo: 30,
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--ignore-certificate-errors',
                        ]
                    })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setViewport({ width: 1200, height: 800 })];
            case 3:
                _a.sent();
                cookies = JSON.parse(fs_1.default.readFileSync('./cookie.json', 'utf-8'));
                _i = 0, cookies_1 = cookies;
                _a.label = 4;
            case 4:
                if (!(_i < cookies_1.length)) return [3 /*break*/, 7];
                cookie = cookies_1[_i];
                console.log(cookie.expires);
                console.log(new Date(cookie.expires * 1000));
                expires = new Date(2020, 1, 13).getTime() / 1000;
                console.log(expires);
                cookie.expires = expires;
                return [4 /*yield*/, page.setCookie(cookie)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, page.goto('https://54.248.50.84/user/')];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.waitFor(10000)];
            case 9:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector('.brand')
                        .then(function (elem) { return elem.getProperty('textContent'); })
                        .then(function (elem) { return elem.jsonValue(); })];
            case 10:
                text = _a.sent();
                console.log(text);
                return [3 /*break*/, 13];
            case 11:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 13];
            case 12:
                if (browser != undefined) {
                    browser.close();
                }
                console.log("end");
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, runPuppeteer()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
