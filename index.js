abror▪️🐾Σ #NeoHash 💊MyGate Network, [2/25/2025 12:36 PM]
const { ethers } = require('ethers');
const cron = require('node-cron');
const Web3 = require('web3');
const axios = require('axios');

// Konfigurasi RPC dan wallet
const METAMASK_RPC = 'https://rpc.sepolia.org'; // Ganti dengan RPC MetaMask
const UNISAT_RPC = 'https://your-unisat-rpc.com'; // Ganti dengan RPC UniSat
const privateKey = 'YOUR_PRIVATE_KEY'; // Ganti dengan private key MetaMask atau UniSat

const web3MetaMask = new Web3(new Web3.providers.HttpProvider(METAMASK_RPC));
const web3UniSat = new Web3(new Web3.providers.HttpProvider(UNISAT_RPC));

const walletMetaMask = web3MetaMask.eth.accounts.privateKeyToAccount(privateKey);
const walletUniSat = web3UniSat.eth.accounts.privateKeyToAccount(privateKey);

web3MetaMask.eth.accounts.wallet.add(walletMetaMask);
web3UniSat.eth.accounts.wallet.add(walletUniSat);

// Kontrak Yala
const YALA_CONTRACT_ADDRESS = 'YOUR_YALA_CONTRACT_ADDRESS';
const YalaABI = [
    // Masukkan ABI kontrak Yala di sini
];
const yalaContract = new web3MetaMask.eth.Contract(YalaABI, YALA_CONTRACT_ADDRESS);

// Fungsi untuk claim faucet
async function claimFaucet() {
    try {
        await axios.get('https://app-testnet.yala.org/faucet');
        console.log('Faucet berhasil diklaim!');
    } catch (error) {
        console.error('Gagal klaim faucet:', error);
    }
}

// Fungsi untuk deposit BTC dan YU
async function depositBTCAndYU(amount) {
    try {
        const tx = yalaContract.methods.deposit(amount);
        const gas = await tx.estimateGas({ from: walletMetaMask.address });
        const data = tx.encodeABI();
        const signedTx = await web3MetaMask.eth.accounts.signTransaction({
            to: YALA_CONTRACT_ADDRESS,
            data,
            gas,
        }, privateKey);
        
        const receipt = await web3MetaMask.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Deposit sukses:', receipt.transactionHash);
    } catch (error) {
        console.error('Deposit gagal:', error);
    }
}

// Fungsi untuk set percentage
async function setPercentage(percentage) {
    try {
        const tx = yalaContract.methods.setPercentage(percentage);
        const gas = await tx.estimateGas({ from: walletMetaMask.address });
        const data = tx.encodeABI();
        const signedTx = await web3MetaMask.eth.accounts.signTransaction({
            to: YALA_CONTRACT_ADDRESS,
            data,
            gas,
        }, privateKey);
        
        const receipt = await web3MetaMask.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(Percentage ${percentage}% berhasil diset:, receipt.transactionHash);
    } catch (error) {
        console.error('Gagal set percentage:', error);
    }
}

// Fungsi untuk stake
async function stakeTokens(amount) {
    try {
        const tx = yalaContract.methods.stake(amount);
        const gas = await tx.estimateGas({ from: walletMetaMask.address });
        const data = tx.encodeABI();
        const signedTx = await web3MetaMask.eth.accounts.signTransaction({
            to: YALA_CONTRACT_ADDRESS,
            data,
            gas,
        }, privateKey);
        
        const receipt = await web3MetaMask.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Stake sukses:', receipt.transactionHash);
    } catch (error) {
        console.error('Stake gagal:', error);
    }
}

// Fungsi untuk follow Twitter dan submit username
async function followTwitterAndSubmit(username) {
    try {
        await axios.post('https://app-testnet.yala.org/submit-twitter', { username });
        console.log('Twitter username berhasil dikirim, 10 berries diperoleh!');
    } catch (error) {
        console.error('Gagal submit Twitter username:', error);
    }
}

// Fungsi untuk klaim berries harian
async function claimDailyBerry() {
    try {
        await axios.get('https://app-testnet.yala.org/claim-berry');
        console.log('Daily Berry berhasil diklaim!');
    } catch (error) {
        console.error('Gagal klaim Daily Berry:', error);
    }
}

abror▪️🐾Σ #NeoHash 💊MyGate Network, [2/25/2025 12:36 PM]
// Menjalankan fungsi setiap hari
cron.schedule('0 0 * * *', async () => {
    console.log('Menjalankan bot Yala...');
    await claimFaucet();
    await depositBTCAndYU(10); // Contoh deposit 10 BTC/YU
    await setPercentage(120); // Set ke 120%
    await stakeTokens(10); // Stake 10 token
    await followTwitterAndSubmit('YourTwitterUsername');
    await claimDailyBerry();
    console.log('Selesai!');
});

console.log('Bot berjalan! Menunggu eksekusi harian...');
