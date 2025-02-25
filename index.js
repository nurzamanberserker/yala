const { Builder, By, until } = require('selenium-webdriver');

async function setupDriver() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    return driver;
}

async function connectWallet(driver) {
    await driver.get("https://app-testnet.yala.org/");
    await driver.sleep(5000);
    let walletButton = await driver.findElement(By.xpath("//button[contains(text(), 'Connect Wallet')]"));
    await walletButton.click();
    await driver.sleep(3000);
    let metamaskButton = await driver.findElement(By.xpath("//button[contains(text(), 'MetaMask')]"));
    await metamaskButton.click();
    await driver.sleep(5000);
}

async function claimFaucet(driver) {
    await driver.get("https://app-testnet.yala.org/faucet");
    await driver.sleep(5000);
    let claimButton = await driver.findElement(By.xpath("//button[contains(text(), 'Claim')]"));
    await claimButton.click();
    await driver.sleep(3000);
}

async function depositBTCYU(driver) {
    await driver.get("https://app-testnet.yala.org/");
    await driver.sleep(5000);
    let depositButton = await driver.findElement(By.xpath("//button[contains(text(), 'Deposit')]"));
    await depositButton.click();
    await driver.sleep(3000);
    let confirmButton = await driver.findElement(By.xpath("//button[contains(text(), 'Confirm')]"));
    await confirmButton.click();
    await driver.sleep(10000);
}

async function stakeYU(driver) {
    await driver.get("https://app-testnet.yala.org/portfolio?index=4");
    await driver.sleep(5000);
    let stakeButton = await driver.findElement(By.xpath("//button[contains(text(), 'Stake')]"));
    await stakeButton.click();
    await driver.sleep(3000);
    let confirmButton = await driver.findElement(By.xpath("//button[contains(text(), 'Confirm')]"));
    await confirmButton.click();
    await driver.sleep(5000);
}

async function claimDailyBerries(driver) {
    await driver.get("https://app-testnet.yala.org/leaderboard");
    await driver.sleep(5000);
    let claimButton = await driver.findElement(By.xpath("//button[contains(text(), 'Claim')]"));
    await claimButton.click();
    await driver.sleep(3000);
}

(async function main() {
    let driver = await setupDriver();
    try {
        await connectWallet(driver);
        await claimFaucet(driver);
        await depositBTCYU(driver);
        await stakeYU(driver);
        await claimDailyBerries(driver);
    } finally {
        await driver.quit();
    }
})();
