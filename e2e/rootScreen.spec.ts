import { expect, device, element, by } from "detox";

describe("Root", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have Root screen", async () => {
    await expect(element(by.id("rootScreen"))).toBeVisible();

    await expect(element(by.id("option-0"))).toBeVisible();

    await element(by.id("option-0")).tap();

    await expect(element(by.text("Next question"))).toBeVisible();

    await element(by.text("Next question")).tap();

    await expect(element(by.text("Play again"))).toBeNotVisible();
  });
});
