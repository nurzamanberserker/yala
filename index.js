const { Builder, By, until } = require('selenium-webdriver');

async function setupDriver() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    return driver;
}

async function clickButton(driver, xpath, timeout = 10000) {
    try {
        let button = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
        await driver.wait(until.elementIsVisible(button), timeout);
        await button.click();
        await driver.sleep(3000);
    } catch (error) {
        console.error(`Gagal klik tombol: ${xpath}`, error);
    }
}

async function connectWallet(driver) {
    await driver.get("https://app-testnet.yala.org/");
    await driver.sleep(5000);
    await clickButton(driver, "//button[contains(text(), 'Connect Wallet')]");
    await clickButton(driver, "//button[contains(text(), 'MetaMask')]");
}

async function claimFaucet(driver) {
    await driver.get("https://app-testnet.yala.org/faucet");
    await driver.sleep(5000);
    await clickButton(driver, "//button[contains(text(), 'Claim')]");
}

async function depositBTCYU(driver) {
    await driver.get("https://app-testnet.yala.org/");
    await driver.sleep(5000);
    await clickButton(driver, "//button[contains(text(), 'Deposit')]");
    await clickButton(driver, "//button[contains(text(), 'Confirm')]");
}

async function stakeYU(driver) {
    await driver.get("https://app-testnet.yala.org/portfolio?index=4");
    await driver.sleep(5000);
    await clickButton(driver, "//button[contains(text(), 'Stake')]");
    await clickButton(driver, "//button[contains(text(), 'Confirm')]");
}

async function claimDailyBerries(driver) {
    await driver.get("https://app-testnet.yala.org/leaderboard");
    await driver.sleep(5000);
    await clickButton(driver, "//button[contains(text(), 'Claim')]");
}

(async function main() {
    let driver = await setupDriver();
    try {
        console.log("[+] Menghubungkan Wallet...");
        await connectWallet(driver);
        console.log("[+] Klaim Faucet...");
        await claimFaucet(driver);
        console.log("[+] Deposit BTC & YU...");
        await depositBTCYU(driver);
        console.log("[+] Staking YU...");
        await stakeYU(driver);
        console.log("[+] Klaim Daily Berries...");
        await claimDailyBerries(driver);
        console.log("[+] Selesai!");
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    } finally {
        await driver.quit();
    }
})();
