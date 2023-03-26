'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CookieService = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('../config');
const parse_domain_1 = await import('parse-domain').then((m) => m.default);
const utils_service_1 = require('../utils/utils.service');
let CookieService = class CookieService {
  constructor(config, utils) {
    this.config = config;
    this.utils = utils;
  }
  setCookie(reply, name, payload, options) {
    return new Promise((resolve, reject) => {
      try {
        const { isProd, isDev } = this.utils.mode();
        const clientHost = this.config.get('app.clientHost');
        let domain = undefined;
        if (isProd) {
          const parseResult = (0, parse_domain_1.parseDomain)(
            clientHost.replace('https://', ''),
          );
          if (parseResult.type === parse_domain_1.ParseResultType.Listed) {
            const { domain: secondLevelDomain, topLevelDomains } = parseResult;
            domain = `.${secondLevelDomain}.${topLevelDomains.join('.')}`;
          }
        }
        const stringifyPayload = JSON.stringify(payload);
        reply.setCookie(
          name,
          stringifyPayload,
          Object.assign(Object.assign({}, options), {
            httpOnly: true,
            secure: !isDev,
            domain,
            path: '/',
            sameSite: isProd ? 'strict' : undefined,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  getCookie(request, name) {
    return new Promise((resolve) => {
      const value = request.cookies[name];
      if (!value) {
        resolve(undefined);
        return;
      }
      resolve(value);
    });
  }
  async clearCookie(reply, name) {
    try {
      this.setCookie(reply, name, '', { maxAge: 0 });
    } catch (error) {
      throw new Error(error);
    }
  }
};
CookieService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [
      config_1.ConfigService,
      utils_service_1.UtilsService,
    ]),
  ],
  CookieService,
);
exports.CookieService = CookieService;
//# sourceMappingURL=cookie.service.js.map
