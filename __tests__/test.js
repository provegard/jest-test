import { jsSum } from "../src/js"

describe("jsSum", () => {
    test("works", () => {
        const actual = jsSum(1, 2)
        expect(actual).toBe(3)
    })
})