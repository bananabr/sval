import { Identifier } from 'acorn';
import Sval from '../src'

describe('testing user-defined filters', () => {
  it('should be called once per expression parsed', () => {
    const interpreter = new Sval({
      // ECMA Version of the code
      // 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
      // or 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024
      // or "latest"
      ecmaVer: 'latest',
      // Code source type
      // "script" or "module"
      sourceType: 'script',
      // Whether the code runs in a sandbox
      sandBox: true
    });
    let count = 0;
    interpreter.run(`globalThis.console.log(console.dir.name);`, {
      "Identifier": (i:any) => {
        count++;
        // Called for globalThis on globalThis.console.log
        // Called for console on console.dir.name
        return i;
      },
      "MemberExpression": (exp:any) => {
        count++;
        // Called for console on globalThis.console.log
        // Called for dir on console.dir.name
        // Called for name on console.dir.name
        return exp;
      },
      "CallExpression": (exp:any) => {
        count++;
        // Called for log on globalThis.console.log
        return exp;
      }
    })
    expect(count).toBe(6);
  })
})
