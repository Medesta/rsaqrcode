// const bigintCryptoUtils = require('bigint-crypto-utils')

const prime1 = 11; /*first prime number  */
const prime2 = 13; /* second prime number */
const e = 7; /* relatively prime number non related to z  */

const n = () => { /* calculating n */
    let a = prime1 * prime2
    return (a);
}

const z = () => { /* calculating z  */
    let a = (prime1 - 1) * (prime2 - 1)
    return a;
}

const decConvert = (string) => { /* convertion of string to ascii decimal code  */
    let a = string.split("");
    let b = [];
    for (let i = 0; i < a.length; i++) {
        b[i] = a[i].codePointAt(0);
    }
    return b;
}
const strConvert = (b) => { /* conversion of ascii decimal code to string */
    let a = []
    for (let i = 0; i < b.length; i++) {
        a[i] = String.fromCodePoint(b[i])
    }
    return a.join("");
}

export const Encrypt = (str) => { /* encrypting data with private key */
    let a = decConvert(str); /* first converting string into decimal */
    let b = [];
    for (let i = 0; i < a.length; i++) {
        b[i] = expmod(a[i], privateKey(), n()) /* applying cipher text formula*/
    }
    // console.log(b);

    return b.join(","); /* array into string in order to show cipher text*/
}

export const Decrypt = (arr) => {/* Decrytion using public key */
    let a = arr.split(","); /* string into array in order to be processed */
    let b = [];
    for (let i = 0; i < a.length; i++) {
        b[i] = expmod(a[i], e, n())  /* applying rsa to decipher*/
    }
    // console.log(b)
    return strConvert(b); /* convertion of deciphered data into string*/

}
const privateKey = () => { /* generating d for completing private key as private key =(d , n) */
    let a = z();
    let b = (modInverse(e, a)); /* mod inverse calculating */
    b = parseInt(b)
    console.log(b)
    return b;
}


const expmod = (base, exp, mod) => {  /* mod with exponents formula algorithm */
    if (exp == 0)
        return 1;

    if (exp % 2 == 0) {
        return Math.pow(expmod(base, (exp / 2), mod), 2) % mod;
    }
    else {
        return (base * expmod(base, (exp - 1), mod)) % mod;
    }
}


const modInverse = (a, m) => {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
        return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
        return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    if (a !== 1) {
        return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}