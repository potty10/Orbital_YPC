import { secondsToTime } from "../../src/utils/DateTimeUtil";

test("secondsToTime() test 1", ()=> {
    expect(secondsToTime(20)).toBe('20 Sec');
    expect(secondsToTime(100)).toBe('1.7 Min')
})