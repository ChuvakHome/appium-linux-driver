"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _lodash = _interopRequireDefault(require("lodash"));

var _baseDriver = require("@appium/base-driver");

var _desiredCaps = require("./desired-caps");

var _index = _interopRequireDefault(require("./commands/index"));

var _logger = _interopRequireDefault(require("./logger"));

var _privateapis = _interopRequireDefault(require("@stdspa/stdspalinux_temp/dist/privateapis"));

var _utils = require("./utils");

const NO_PROXY = [];

class AtSpi2Driver extends _baseDriver.BaseDriver {
  constructor(opts = {}) {
    super(opts);
    this.desiredCapConstraints = _desiredCaps.desiredCapConstraints;
    this.locatorStrategies = ['xpath'];

    for (const [cmd, fn] of _lodash.default.toPairs(_index.default)) {
      AtSpi2Driver.prototype[cmd] = fn;
    }
  }

  proxyActive() {
    return false;
  }

  getProxyAvoidList() {
    return NO_PROXY;
  }

  canProxy() {
    return false;
  }

  async createSession(...args) {
    const [sessionId, caps] = await super.createSession(...args);

    if (!caps.appName) {
      throw new _baseDriver.errors.UnknownError("application should be specified");
    }

    this.appName = caps.appName;

    _logger.default.info(`Killing the app ${this.appName} if it's already running`);

    _privateapis.default.app_kill(this.appName);

    await (0, _utils.wait4sec)(1);

    _logger.default.info(`Lauching app ${this.appName}`);

    const launchResult = _privateapis.default.app_launch(this.appName);

    if (!launchResult.ok) {
      switch (launchResult.errCode) {
        case 1000:
          throw new _baseDriver.errors.UnknownError("application is running while trying to start it");

        case 1001:
          throw new _baseDriver.errors.UnknownError("the specified appName is wrong");

        case 1002:
          throw new _baseDriver.errors.UnknownError("timeout while lauching app");
      }
    }

    _logger.default.info(`App ${this.appName} lauched successful`);

    this._win = null;
    return [sessionId, caps];
  }

  async deleteSession() {
    if (this.appName) {
      _logger.default.info(`App ${this.appName} is killed before closing session`);

      _privateapis.default.app_kill(this.appName);
    }

    await super.deleteSession();
  }

}

var _default = AtSpi2Driver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJwcm90b3R5cGUiLCJwcm94eUFjdGl2ZSIsImdldFByb3h5QXZvaWRMaXN0IiwiY2FuUHJveHkiLCJjcmVhdGVTZXNzaW9uIiwiYXJncyIsInNlc3Npb25JZCIsImNhcHMiLCJhcHBOYW1lIiwiZXJyb3JzIiwiVW5rbm93bkVycm9yIiwibG9nIiwiaW5mbyIsImFwaXMiLCJhcHBfa2lsbCIsImxhdW5jaFJlc3VsdCIsImFwcF9sYXVuY2giLCJvayIsImVyckNvZGUiLCJfd2luIiwiZGVsZXRlU2Vzc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBRUEsTUFBTUMsWUFBTixTQUEyQkMsc0JBQTNCLENBQXNDO0FBQ3BDQyxFQUFBQSxXQUFXLENBQUVDLElBQUksR0FBRyxFQUFULEVBQWE7QUFDdEIsVUFBTUEsSUFBTjtBQUNBLFNBQUtDLHFCQUFMLEdBQTZCQSxrQ0FBN0I7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixDQUFDLE9BQUQsQ0FBekI7O0FBQ0EsU0FBSyxNQUFNLENBQUNDLEdBQUQsRUFBTUMsRUFBTixDQUFYLElBQXdCQyxnQkFBRUMsT0FBRixDQUFVQyxjQUFWLENBQXhCLEVBQTZDO0FBQzNDVixNQUFBQSxZQUFZLENBQUNXLFNBQWIsQ0FBdUJMLEdBQXZCLElBQThCQyxFQUE5QjtBQUNEO0FBQ0Y7O0FBRURLLEVBQUFBLFdBQVcsR0FBSTtBQUNiLFdBQU8sS0FBUDtBQUNEOztBQUVEQyxFQUFBQSxpQkFBaUIsR0FBSTtBQUNuQixXQUFPZCxRQUFQO0FBQ0Q7O0FBRURlLEVBQUFBLFFBQVEsR0FBSTtBQUNWLFdBQU8sS0FBUDtBQUNEOztBQUVrQixRQUFiQyxhQUFhLENBQUUsR0FBR0MsSUFBTCxFQUFXO0FBQzVCLFVBQU0sQ0FBQ0MsU0FBRCxFQUFZQyxJQUFaLElBQW9CLE1BQU0sTUFBTUgsYUFBTixDQUFvQixHQUFHQyxJQUF2QixDQUFoQzs7QUFDQSxRQUFJLENBQUNFLElBQUksQ0FBQ0MsT0FBVixFQUFtQjtBQUNqQixZQUFNLElBQUlDLG1CQUFPQyxZQUFYLENBQXdCLGlDQUF4QixDQUFOO0FBQ0Q7O0FBQ0QsU0FBS0YsT0FBTCxHQUFlRCxJQUFJLENBQUNDLE9BQXBCOztBQUNBRyxvQkFBSUMsSUFBSixDQUFVLG1CQUFrQixLQUFLSixPQUFRLDBCQUF6Qzs7QUFDQUsseUJBQUtDLFFBQUwsQ0FBYyxLQUFLTixPQUFuQjs7QUFDQSxVQUFNLHFCQUFTLENBQVQsQ0FBTjs7QUFDQUcsb0JBQUlDLElBQUosQ0FBVSxnQkFBZSxLQUFLSixPQUFRLEVBQXRDOztBQUNBLFVBQU1PLFlBQVksR0FBR0YscUJBQUtHLFVBQUwsQ0FBZ0IsS0FBS1IsT0FBckIsQ0FBckI7O0FBQ0EsUUFBSSxDQUFDTyxZQUFZLENBQUNFLEVBQWxCLEVBQXNCO0FBQ3BCLGNBQU9GLFlBQVksQ0FBQ0csT0FBcEI7QUFDRSxhQUFLLElBQUw7QUFDRSxnQkFBTSxJQUFJVCxtQkFBT0MsWUFBWCxDQUF3QixpREFBeEIsQ0FBTjs7QUFDRixhQUFLLElBQUw7QUFDRSxnQkFBTSxJQUFJRCxtQkFBT0MsWUFBWCxDQUF3QixnQ0FBeEIsQ0FBTjs7QUFDRixhQUFLLElBQUw7QUFDRSxnQkFBTSxJQUFJRCxtQkFBT0MsWUFBWCxDQUF3Qiw0QkFBeEIsQ0FBTjtBQU5KO0FBUUQ7O0FBQ0RDLG9CQUFJQyxJQUFKLENBQVUsT0FBTSxLQUFLSixPQUFRLHFCQUE3Qjs7QUFDQSxTQUFLVyxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQU8sQ0FBQ2IsU0FBRCxFQUFZQyxJQUFaLENBQVA7QUFDRDs7QUFFa0IsUUFBYmEsYUFBYSxHQUFJO0FBQ3JCLFFBQUksS0FBS1osT0FBVCxFQUFrQjtBQUNoQkcsc0JBQUlDLElBQUosQ0FBVSxPQUFNLEtBQUtKLE9BQVEsbUNBQTdCOztBQUNBSywyQkFBS0MsUUFBTCxDQUFjLEtBQUtOLE9BQW5CO0FBQ0Q7O0FBQ0QsVUFBTSxNQUFNWSxhQUFOLEVBQU47QUFDRDs7QUF0RG1DOztlQXlEdkIvQixZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEJhc2VEcml2ZXIgfSBmcm9tICdAYXBwaXVtL2Jhc2UtZHJpdmVyJztcbmltcG9ydCB7IGRlc2lyZWRDYXBDb25zdHJhaW50cyB9IGZyb20gJy4vZGVzaXJlZC1jYXBzJztcbmltcG9ydCBjb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzL2luZGV4JztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IGFwaXMgZnJvbSAnQHN0ZHNwYS9zdGRzcGFsaW51eF90ZW1wL2Rpc3QvcHJpdmF0ZWFwaXMnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnQGFwcGl1bS9iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyB3YWl0NHNlYyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBOT19QUk9YWSA9IFtdO1xuXG5jbGFzcyBBdFNwaTJEcml2ZXIgZXh0ZW5kcyBCYXNlRHJpdmVyIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIHN1cGVyKG9wdHMpO1xuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENhcENvbnN0cmFpbnRzO1xuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbJ3hwYXRoJ107XG4gICAgZm9yIChjb25zdCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGNvbW1hbmRzKSkge1xuICAgICAgQXRTcGkyRHJpdmVyLnByb3RvdHlwZVtjbWRdID0gZm47XG4gICAgfVxuICB9XG5cbiAgcHJveHlBY3RpdmUgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0ICgpIHtcbiAgICByZXR1cm4gTk9fUFJPWFk7XG4gIH1cblxuICBjYW5Qcm94eSAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IFtzZXNzaW9uSWQsIGNhcHNdID0gYXdhaXQgc3VwZXIuY3JlYXRlU2Vzc2lvbiguLi5hcmdzKTtcbiAgICBpZiAoIWNhcHMuYXBwTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJhcHBsaWNhdGlvbiBzaG91bGQgYmUgc3BlY2lmaWVkXCIpO1xuICAgIH1cbiAgICB0aGlzLmFwcE5hbWUgPSBjYXBzLmFwcE5hbWU7XG4gICAgbG9nLmluZm8oYEtpbGxpbmcgdGhlIGFwcCAke3RoaXMuYXBwTmFtZX0gaWYgaXQncyBhbHJlYWR5IHJ1bm5pbmdgKTtcbiAgICBhcGlzLmFwcF9raWxsKHRoaXMuYXBwTmFtZSk7XG4gICAgYXdhaXQgd2FpdDRzZWMoMSk7XG4gICAgbG9nLmluZm8oYExhdWNoaW5nIGFwcCAke3RoaXMuYXBwTmFtZX1gKTtcbiAgICBjb25zdCBsYXVuY2hSZXN1bHQgPSBhcGlzLmFwcF9sYXVuY2godGhpcy5hcHBOYW1lKTtcbiAgICBpZiAoIWxhdW5jaFJlc3VsdC5vaykge1xuICAgICAgc3dpdGNoKGxhdW5jaFJlc3VsdC5lcnJDb2RlKSB7XG4gICAgICAgIGNhc2UgMTAwMDpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihcImFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgd2hpbGUgdHJ5aW5nIHRvIHN0YXJ0IGl0XCIpO1xuICAgICAgICBjYXNlIDEwMDE6XG4gICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoXCJ0aGUgc3BlY2lmaWVkIGFwcE5hbWUgaXMgd3JvbmdcIik7XG4gICAgICAgIGNhc2UgMTAwMjpcbiAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihcInRpbWVvdXQgd2hpbGUgbGF1Y2hpbmcgYXBwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2cuaW5mbyhgQXBwICR7dGhpcy5hcHBOYW1lfSBsYXVjaGVkIHN1Y2Nlc3NmdWxgKTtcbiAgICB0aGlzLl93aW4gPSBudWxsO1xuICAgIHJldHVybiBbc2Vzc2lvbklkLCBjYXBzXTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVNlc3Npb24gKCkge1xuICAgIGlmICh0aGlzLmFwcE5hbWUpIHtcbiAgICAgIGxvZy5pbmZvKGBBcHAgJHt0aGlzLmFwcE5hbWV9IGlzIGtpbGxlZCBiZWZvcmUgY2xvc2luZyBzZXNzaW9uYCk7XG4gICAgICBhcGlzLmFwcF9raWxsKHRoaXMuYXBwTmFtZSk7XG4gICAgfVxuICAgIGF3YWl0IHN1cGVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdFNwaTJEcml2ZXI7Il0sImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
