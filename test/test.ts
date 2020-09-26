// Mock random
Math.random = () => 0.0;

import Skoy from "../lib/skoy";

describe("Skoy", () => {
  it("converts words", () => {
    expect(Skoy.convert("สวัสดี")).toBe("ษวัษดลีร์");
    expect(Skoy.convert("พวก")).toBe("พ๊ห์ก");
    expect(Skoy.convert("หนู")).toBe("หนุ๊");
  });

  it("converts แ to double เ", () => {
    expect(Skoy.convert("แก")).toBe("เเก");
  });
});
