// outside of a Vue file
import { Dialog, DialogChainObject, Notify, QBtnProps, QDialogSelectionPrompt, copyToClipboard, date, scroll } from 'quasar';

import { ResponseStatus } from 'repository/models';
import { useBootstrapStore } from 'src/stores/bootstrap-store';

type NMessage = {
  ok?: boolean | string | QBtnProps;
  msg?: string;
  title?: string;
  alert?: boolean,
  label?: string | boolean | Record<string, string>;
  status: ResponseStatus;
  cancel?: boolean | string | QBtnProps;
  danger?: string | boolean | Record<string, string>;
  message: string;
  timeout?: number;
  options?: QDialogSelectionPrompt
  persistent?: true,
  onDismiss?: (n?: () => void) => void
} | {
  ok?: boolean | string | QBtnProps;
  msg: string;
  title?: string;
  alert?: boolean,
  label?: string | boolean | Record<string, string>;
  status: ResponseStatus;
  cancel?: boolean | string | QBtnProps;
  danger?: string | boolean | Record<string, string>;
  message?: string;
  timeout?: number;
  onDismiss?: (n?: () => void) => void
}

const helpers = {
  /**
   * @description Read env variables from .env file and modify based on current environment
   */
  env (env: string = 'baseURL', skipDev: boolean = false): string {
    if (import.meta.env.PROD || import.meta.env.v_ENVIRONMENT === 'production' || skipDev) {
      // Production
      return import.meta.env[`v_${env}`];
    } else {
      // Development
      if (import.meta.env[`v_dev.${env}`]) {
        return import.meta.env[`v_dev.${env}`];
      } else {
        return helpers.env(env, true)
      }
    }
  },
  subString (str: string, len: number, eli: string = '...') {
    return str.length > len ? str.substring(0, len - eli.length).trim() + eli : str;
  },
  /**
   * Substitutes the placeholders in a string with the values from the object
   * @param {String} string
   * @param {Object} data
   */
  str_subst (string: string, data: Record<string, string> = {}) {
    ['last_updated', 'created_at', 'updated_at', 'date'].forEach((key) => {
      if (data[key]) {
        data[key] = date.formatDate(new Date(data[key]), 'YYYY/MM/DD');
      }
    });

    return string.replace(/{\s*([a-zA-Z0-9_]+)\s*}/g, (match, key) => {
      return data[key] || '';
    });
  },
  /**
   * Break an array into multiple other arrays making it
   * grouped by the specified size
   * @returns
   */
  chunk<Input> (arr: Input[], size: number = 2): Input[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  ,
  date (d: string, format = 'YYYY/MM/DD') {
    return date.formatDate(new Date(d), format);
  },

  /**
   * Converts seconds to MM:SS format
   * @param {String|Number} seconds
   * @returns
   * @example formatSeconds(128) // $
   */
  formatSeconds (seconds: string | number = 0) {
    if (!seconds) {
      seconds = 0;
    }

    if (typeof seconds === 'string') {
      seconds = parseInt(seconds);
    }

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let time = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // If time contains a . remove the miliseconds
    if (time.includes('.')) {
      time = time.split('.')[0];
    }
    return time.replace('.', ':');
  },
  /**
   * Generate an array based on specifed range
   * @param {Number} size
   * @param {Number} startAt
   * @returns
   */
  range (size: number, startAt: number = 0) {
    if (!size) return [];

    return [...Array(size).keys()].map((i) => i + startAt);
  },
  copy (str: string) {
    if (typeof str !== 'string') return false;

    copyToClipboard(str)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: 'Copied to clipboard',
        });
      })
      .catch(() => {
        Notify.create({
          type: 'negative',
          message: 'Failed to copy',
        });
      });
  },
  tagify (string: string, limit: number = 3) {

    let tags = string.split(',');
    const more = tags.length - limit;

    if (tags.length > limit) {
      tags = tags.slice(0, limit);
      tags.push('+ ' + more + ' more');
    }

    return tags;
  },
  scrollToElement (el: HTMLElement, addOffset: number = 0, duration: number = 1000) {
    const { getScrollTarget, setVerticalScrollPosition } = scroll;

    const target = getScrollTarget(el);
    const offset = el.offsetTop + addOffset;
    setVerticalScrollPosition(target, offset, duration);
  },
  /**
   *
   * @param data The message to be displayed or an object with message and qdialog options
   * @param status [success, error, danger, warning, alert, notice, info]
   * @param alert   Setting value to true will make the notification a dialog
   * @param label  You can set value to "Persistent" to remove label
   *                                  and make the dialog persistent or set to
   *                                  Boolean "false" to only remove label
   * @param cancel  Setting value to true will add a cancel button to the dialog
   * @param danger
   * @xreturns {Boolean | Object}  Returns false if no message is provided
   */
  notify (
    data: string | NMessage,
    status: ResponseStatus = 'info',
    alert: boolean = false,
    label: string | boolean | QBtnProps = 'OK',
    cancel: string | boolean | QBtnProps = false,
    danger: string | boolean | Record<string, string> = false
  ): DialogChainObject | void {

    let options: Record<string, string | number | boolean> = {}
    const msg = typeof data === 'object' ? data.message || data.msg || null : data;

    if (typeof data === 'object') {
      label = data.label || data.ok || 'OK'
      alert = data.alert || false
      cancel = data.cancel || false
      danger = data.danger || false
      status = data.status;

      // create a new object from data without message and status
      options = Object.keys(data)
        .filter(
          (key) =>
            [
              'message',
              'msg',
              'status',
              'alert',
              'label',
              'cancel',
              'onDismiss',
            ].indexOf(key) === -1
        )
        .reduce((obj: { [key: string]: string }, key) => {
          obj[key] = (data as unknown as { [key: string]: string })[key];
          return obj;
        }, {})
    }

    if (msg === '' || !msg) {
      return;
    }

    const tx = {
      success: {
        class: 'green-10',
        btnColor: 'bg-green-6 text-white',
        textColor: 'green-1',
        type: 'positive',
      },
      error: {
        class: 'red-1',
        btnColor: 'bg-yellow-6 text-white',
        textColor: 'red-8',
        type: 'negative',
      },
      danger: {
        class: 'red-1',
        btnColor: 'bg-red-6 text-white',
        textColor: 'red-8',
        type: 'negative',
      },
      warning: {
        class: 'yellow-1',
        btnColor: 'bg-yellow-6 text-white',
        textColor: 'yellow-10',
        type: 'warning',
      },
      alert: {
        class: 'yellow-1',
        btnColor: 'bg-yellow-6 text-white',
        textColor: 'yellow-10',
        type: 'warning',
      },
      notice: {
        class: 'grey-1',
        btnColor: 'bg-grey-6 text-white',
        textColor: 'grey-8',
        type: 'ongoing',
      },
      info: {
        class: 'blue-10',
        btnColor: 'bg-blue-6 text-white',
        textColor: 'blue-1',
        type: 'info',
      },
    };

    const tx_status = tx[status] ?? tx['info'];
    const ne_cancel = label !== 'persistent' || cancel === false;

    if (['string', 'boolean'].includes(typeof cancel)) {
      cancel =
        cancel === false
          ? false
          : {
            color: danger
              ? 'green-8'
              : ne_cancel
                ? 'negative'
                : tx_status.textColor,
            label: typeof cancel === 'string' ? cancel : 'Cancel',
            textColor: 'white',
            unelevated: true,
            noCaps: true,
          } as unknown as Record<string, string>;
    }

    if (['string', 'boolean'].includes(typeof label)) {
      label =
        label === 'persistent' || label === false
          ? false
          : {
            label,
            flat: !!danger,
            color: !!danger ? 'negative' : tx_status.textColor,
            class: !danger ? tx_status.btnColor : undefined,
            textColor: !!danger ? 'negative' : 'white',
            unelevated: true,
            noCaps: true,
          } as unknown as Record<string, string>;
    }

    function isDialog (alert: boolean): alert is boolean {
      return alert === true
    }

    if (isDialog(alert)) {
      return Dialog.create({
        ...options,
        class: `mode-dialog q-pa-sm important bg-${tx_status.class} text-${tx_status.textColor}`,
        cancel,
        ok: label,
        title: options.title as string || status.toUpperCase(),
        message: msg,
        persistent: label === 'persistent' || !!options.persistent,
      });
    } else {
      if (typeof data === 'object' && data.timeout) {
        options.timeout = data.timeout && data.onDismiss ? 0 : data.timeout;
      }
      const notify = Notify.create({
        ...options,
        classes: 'no-shadow',
        type: tx_status.type || status,
        message: msg,
      });

      if (typeof data === 'object') {
        if (typeof data.timeout !== 'undefined') {
          const t = setTimeout(() => {
            typeof data.onDismiss !== 'undefined' && data.onDismiss(notify);
            notify();
            clearTimeout(t);
          }, data.timeout);
        } else {
          typeof data.onDismiss !== 'undefined' && data.onDismiss(notify);
        }
      }

      return;
    }
  },
  nlText (str: string, lines: number = 2, breaker: string = '<br />') {
    const splitext = helpers.chunk(str.split(' '), lines);
    let text = '';
    splitext.forEach((el) => {
      text += el.join(' ') + breaker;
    });

    return text;
  },
  goto (link: Location | (string & Location)) {
    window.location = link;
  },
  asset (url: string) {
    if (process.env.PREFER_ASSET === 'true' && url.indexOf('http') !== -1) {
      const base_url = document.createElement('a');
      base_url.href = url;
      url = base_url.pathname.replace(/^\/|\/$/g, '');
    }
    return process.env.ASSET_URL + url;
  },
  nameFromPath (path: string) {
    const base_url = document.createElement('a');
    base_url.href = path;
    return base_url.pathname.replace(/\/|\.|\/$/g, '');
  },
  getPageNumber (path: string, key: string = 'page') {
    if (!path || path.indexOf(key) === -1) {
      return 1;
    }
    return path.split(key + '=').pop();
  },
  /**
   * Set the loading state of a property
   *
   * @param {*} prop
   * @param {*} state
   * @param {*} ids
   */
  loadingState (prop: null | boolean | Record<string, boolean> = null, state: boolean = true, ids: string | string[] | null = null) {
    if (prop && ids && Array.isArray(ids)) {
      ids.map((e) => {
        if (prop && typeof prop !== 'boolean') {
          prop[e] = state;
        }
      });
    } else {
      if (prop && typeof ids === 'string' && typeof prop !== 'boolean') {
        prop[ids] = state;
      } else {
        prop = state;
      }
    }
  },
  arrayClean (array: string[] | number | Record<string, string>[], getObj: boolean = false) {
    const obj = JSON.parse(JSON.stringify(array));

    if (getObj === true) {
      return obj;
    }
    return Object.keys(obj).map((i) => obj[i]);
  },
  objMap (obj: Record<string, string>, func: (obj: Record<string, string>, key: string) => string) {

    obj = JSON.parse(JSON.stringify(obj));

    const newObj: Record<string, string> = {};

    Object.keys(obj).map((key) => {
      newObj[key] = func(obj, key);
    });
    return newObj;
  },
  isEven (n: number | string) {


    if (typeof n === 'string') {
      n = parseFloat(n)
    }

    if (!Number.isFinite(n)) return false;

    return n % 2 == 0;
  },
  isOdd (n: number) {

    if (!Number.isFinite(parseFloat(n as unknown as string))) return false;

    return Math.abs(n % 2) == 1;
  },
  money (
    amount: number | string,
    abbrev: boolean = false,
    curr: boolean | 'code' = true,
    trail_zeros: boolean = false,
    getInt: boolean = false,
  ) {
    const boot = useBootstrapStore();
    const defsettings = { currency: 'USD', currency_symbol: '$' };
    const settings = boot.configuration as unknown as typeof defsettings || defsettings;

    const currency = settings.currency || defsettings.currency,
      symbol = settings.currency_symbol || defsettings.currency_symbol;

    if (!amount) {
      amount = 0;
    }

    if (typeof amount === 'string') {
      amount = parseFloat(amount.replace(/[^0-9.]/gi, ''));
    }

    if (getInt === true) {
      return amount;
    }

    let parsedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    if (trail_zeros === false) {
      parsedAmount = parsedAmount.replace(/(\.[0-9]*?)0+/g, '');
    }

    let symb: string;
    if (curr === true) {
      symb = symbol
    } else if (curr === 'code') {
      symb = currency
    } else {
      symb = ''
    }

    return symb + (abbrev === true ? helpers.intStr(amount) : parsedAmount);
  },
  humanize (num: number, slugify?: '-' | '_'): string {
    if (!num) {
      return '';
    }

    if (slugify === '-' || slugify === '_') {
      const h = helpers.humanize(num)
      return typeof h === 'string' ? h.replace(' ', slugify).toLowerCase() : h;
    }

    const ones = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const tens = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];

    const numString: string = num.toString();

    if (num < 0) throw new Error('Negative numbers are not supported.');

    if (num === 0) return 'zero';

    //the case of 1 - 20
    if (num < 20) {
      return ones[num];
    }

    if (numString.length === 2) {
      return tens[numString[0] as unknown as number] + ' ' + ones[numString[1] as unknown as number];
    }

    //100 and more
    if (numString.length == 3) {
      if (numString[1] === '0' && numString[2] === '0')
        return ones[numString[0] as unknown as number] + ' hundred';
      else
        return (
          ones[numString[0] as unknown as number] +
          ' hundred and ' +
          helpers.humanize(+(numString[1] + numString[2]), slugify)
        );
    }

    if (numString.length === 4) {
      const end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return ones[numString[0] as unknown as number] + ' thousand';
      if (end < 100)
        return (
          ones[numString[0] as unknown as number] + ' thousand and ' + helpers.humanize(end, slugify)
        );
      return ones[numString[0] as unknown as number] + ' thousand ' + helpers.humanize(end, slugify);
    }

    return num as unknown as string;
  },
  intStr (n?: number) {
    if (!n) {
      return 0
    }

    const num: string = n.toString().replace(/[^0-9.]/g, '');

    if (n < 1000) {
      return num;
    }

    const si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];

    let index;

    for (index = si.length - 1; index > 0; index--) {
      if (n >= si[index].v) {
        break;
      }
    }
    return (
      (n / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
      si[index].s
    );
  },
  formatBytes (bytes?: number, decimals: number = 2, bits: boolean = false) {
    if (!bytes || !+bytes) return bits ? '0 B' : '0 Bytes'

    const k = bits ? 1000 : 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = bits
      ? ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  },
  openFullscreen (el: string | Element) {
    const elem = typeof el === 'string' ? document.querySelector(el ?? '') : el;
    if (!el) {
      return false;
    }

    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    }
  },
  doter (obj: Record<string, string>, currentKey = '') {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = currentKey ? `${currentKey}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        // Recursively call the function for nested objects
        Object.assign(result, helpers.doter(value, newKey));
      } else {
        result[newKey] = value;
      }
    }

    return result;
  },
  currentUrl () {
    return location.href;
  },
  arrayUnique (array: Record<string, string>[], prop = 'id') {
    const set = new Set();
    return array.filter(i => !set.has(i[prop]) && set.add(i[prop]));
  },
  /**
   * @description Read env variables from .env file and modify based on current environment
   */
  readEnv (env: string = 'baseURL', skipDev: boolean = false): string {

    if (import.meta.env.PROD || import.meta.env.v_ENVIRONMENT === 'production' || skipDev) {
      // Production
      return import.meta.env[`v_${env}`];
    } else {
      // Development
      if (import.meta.env[`v_dev.${env}`]) {
        return import.meta.env[`v_dev.${env}`];
      } else {
        return helpers.readEnv(env, true)
      }
    }
  }
};

export default helpers
export const env = helpers.env
export const chunk = helpers.chunk
export const doter = helpers.doter
export const money = helpers.money
export const intStr = helpers.intStr
export const notify = helpers.notify
export const readEnv = helpers.readEnv
export const subString = helpers.subString
export const currentUrl = helpers.currentUrl
export const formatBytes = helpers.formatBytes
export const arrayUnique = helpers.arrayUnique
export const formatSeconds = helpers.formatSeconds
