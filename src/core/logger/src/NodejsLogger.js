// @flow

import os from 'os';
import path from 'path';
import winston, { format, transports } from 'winston';
import { SPLAT } from 'triple-beam';
import { sprintf } from '@kiwicom/js';

import type { ILogger } from './ILogger';

const sprintfFormat = format.printf(info => {
  const { level, message: rawMessage, [SPLAT]: splat } = info;
  const message =
    splat === undefined ? rawMessage : sprintf(rawMessage, ...splat);
  return `${level}: ${message}`;
});

/**
 * https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30#configure-your-datadog-agent
 * https://github.com/winstonjs/winston
 */
export default class NodejsLogger implements ILogger {
  #logfile = path.join(os.tmpdir(), 'com.kiwi.universe', 'combined.log');

  constructor() {
    winston.loggers.add('datadog', {
      exitOnError: false,
      format: format.combine(format.errors({ stack: true }), format.json()),
      transports: [
        new transports.File({
          filename: this.#logfile,
          tailable: true,
          maxsize: 1024 * 1024 * 10, // 10 MB in bytes
          maxFiles: 1,
        }),
      ],
    });
    winston.loggers.add('localhost', {
      exitOnError: false,
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        sprintfFormat,
      ),
      transports: [new transports.Console()],
    });
  }

  log(...message: $ReadOnlyArray<string>) {
    this._console().info(...message);
  }

  warn(...message: $ReadOnlyArray<string>) {
    this._console().warn(...message);
    this._datadog().warn(...message);
  }

  error(...message: $ReadOnlyArray<string>) {
    this._console().error(...message);
    this._datadog().error(...message);
  }

  _console() {
    return winston.loggers.get('localhost');
  }

  _datadog() {
    return winston.loggers.get('datadog');
  }
}
