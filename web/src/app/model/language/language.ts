export interface Language {
  code: string;
  name: string;
  icon: string;
}

export const MockLanguage: Language[] = [
  {
    code: 'en',
    name: 'English',
    icon:
      // tslint:disable-next-line: max-line-length
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAABT0lEQVRIS2PMFlaJ3SwbPO8dqwgLAwgwM4Ephr//IDQRfCYONobqI7kQ9cSDl///M6QyyhmU/37LKAixnEzAyM7KUHummBzdLxl5TLv////zl2HnvBQGRkYGhpiGC2CDFtcbEM1nZmNhODXXgiQHTJm3FKwe7oBd81MYGBkYGKKhDljSYEA0n5mVheHUPHIdYNH7///P3wxi8iYk+xzmZVZudoZtpyJJCoG1959AQwDNAaT4HGYjGzc7w1ayHTCaBkbTwGgaQEsDJGVmqGKKygE+h8n///34xSAhZ8zA8J+BgYmNGVwC/v39l2g+Oy8Hw/q9gSS5HV4QNU2c+5+dnY0hNTqUJAMoVQyvCwbcAZ0soIBnYAhWlKHUUyTph0fBgDtgwKNgwB3QycLwgoGBQZykCKSe4meMHcwMvoyMDHMYGBjEqGcuUSY9+/+fIQMA7YEh8yRPGe0AAAAASUVORK5CYII='
  },
  {
    code: 'ch',
    name: 'Chinese',
    icon:
      // tslint:disable-next-line: max-line-length
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACV0lEQVRIS+2Wy2oUQRSG/1PdMz2OGTMJEiHgSnDvIwhuovssTERQEFyIezeCIIg+gCuDC3Uj4saBoA/gM7gUUVEQNcmk05eqI39Nz8WZCXSGNtlYUAzTp7rOV+fyV8vbILiSqdtIVUMc4qiL5DUx16RjJDts5/1zEkJeC5QPLrUXBud3qnAA+CsiMAACEW/nYi3s/E8b1/Ss5Ufn10+/eAKAm2eqSFURXA6RvcwR5YIaQUQ8FO25em6EMrSVdw9MAFxsL/iTcfPYOewtKZY3j+PH/QT2lUXTGNQLAMI1n0XeX7yeIDLGgxxkTACszLdhuaFz2LIWrXsRFlfrSD46fFrZQQuBh2DIeXoPIEC8ViFA2lSED2qIzk82hCZA/DiFPrVA3oNgEoIiDYzAQWphagQY/i1nYW6EWLrd8Cfk2H6f4ffdBHOfDRpFFGxRB4wal7FG+nVSJhVTayBzDtucyw5n3rUGAF8excif5GgHgQdgRzACiXM4NmMtTO0CRqBrLeRmiMVbEdKvDrWTBm5H8f1CF60kQFR0w18AM9TCvgC7zuFEp4G9Dxbf7sSonzY49bCJ9E0O3bAegCEnAGelKfB5PQvgnEH8IhuKS13QvFqDPs9hkqEWVFqEVEKKjBXAOfXOKTx0QjAqo+FDHWnDKnWAABSivtzSF9uKzlkbnP4ZgQDMVa0Do3fBaBuNV3t3PfG930OtUIpLAQiwu5Z4SWZ6/sllNC4iVV0+4/vuexuOL6zq+p0ZoIyszrKmdARm2bzMO/8BBhE4yo/SSCSTo/osp/NQzPU/5fiNdMStg9AAAAAASUVORK5CYII='
  },
  {
    code: 'es',
    name: 'Spanish',
    icon:
      // tslint:disable-next-line: max-line-length
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACcUlEQVRIS+2WXUiTYRiGr2/f3NStocycmSxdlgodhBYSHXRglAXRQVBkP2dWEHmgSeRBFBEY/hREQfSDUIRgIWhpBznQ0jCbWNq0hkT+pEu3as5Wn+5bbKkQGHMx9MT37IXnve/rebkfeIQykT0KuAUYWNxjlyFfqBAZXQLz2VbtfgCf/1a4IWNR+6/s6Q34LQMs/Q+8Oo9PjFCSuXfzXxnwyTDi1KLXeVCrvLy3+XhQp2WFVuD0cXegdsCuQ4WTBIMy5Px0PHz5JwP/AnC5lXT0rWbUoWGV3k3T4y40K1NJTE5kTYKLcSdMSjpidT/JyfqENnoqJIigALNq/Y4t2BrHyLz3hLEUI6anzXS3v6Cvsx6FV2D/jjeoVIFBCuksCECWYTq1EWtRASnVj5iKjiJuaIxfnknMtTfYlVeMbDuCQuoPydxfHBRAlgXqzLHk5ldjbX1Ghm0Ql+RBeaUSm07L8Kmj7Dt2jrbaErLXtiCKckgQQQFsAzG0didx4GQF9qEPJKdl4bl5HensGaQoNZbyEnIPFlFXdZF0Qzvrjc7wAvT0x1F66R13W7qxWsy4HKNMfBlm/OodYnI2oc7eGgC4XHCIndscbEx3hRdgxC5Qds1LabUZ6+smulrrAwbeaS+iUiQ+aR2784ppuH+BbGMDer0YXgC/2tveCEzba2hpqOFjbxs+H2h1Gjqfd2JMTaOwvIqvlsPoNYMhmS8ohHOKQgSS5OW7O5Jmi4EM0wSmxG9Eqr0ICiX4Qpv/Wd2gIZyvJfcPFdpoKeRu53vwXwBhcZ4RmQNY3geWf2CJl9LPwsxafhuID2fKF6D1WYYTvwHRVyevJpmofwAAAABJRU5ErkJggg=='
  }
];
