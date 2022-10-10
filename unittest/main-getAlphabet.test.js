
const { getAlphabet } = require('../main_v1.0');
test("change alphabet to index", () => {
    expect(getAlphabet(0)).toBe("A");
});
test("change alphabet to index", () => {
    expect(getAlphabet(9)).toBe("J");
});