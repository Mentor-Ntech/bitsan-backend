const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const securityKey = crypto.randomBytes(32);
// const initVector = 'b9 77 13 56 42 c9 15 19 23 24 56 17 21 a1 53 20 '
// const securityKey = "2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567"


// console.log(initVector);
// console.log(securityKey);









// var theCipher = "ccZmMULq3tlzAY+iafZz+96xz+qFsAuGpEjhN7CckJTcdBT03fgobfSVGCGYzILyPNSA3e3msUqHUTCpv8kRnWvFdLv9c+GTEhg+Lj5dOThGDHtkQX2j5bd6Eubw9/l+Lcwj0PeyW0ZoVkB5Nnp1yCnmKAn2Euliq+IurgthT+wln6cQmTjXfL4IB5VxwUEb72FcbeiCfbKxa+MxxbcQTCpli3ErSptwdp9on2k87JTPFqyyMmMRFA9VgOXpHNe43IwFzME01DyHZ+Rp/eQguTmY9FtkFIZeD2e2nrbbDbW6tlk/KOtdhGVIlIGMPNS5m8LYqlrGZlJU3JythEy+J0z1wW1owjVe9Yto2OtUe8WeKI744enBKAX4FnD4My7+/XRjbF5kf6loT9lqeMCdXFb3LDej3GVcKWbJuZjXmD4="

// var key = "abcdefghijklmnopqrstuvwx"


// var encrypt = ()=>{
//   const cipher =crypto.createCipheriv('des-ede3', key, "");

// //Add the auto padding here....IT HAVE TO BE after creating the decipher immeditely
// cipher.setAutoPadding(false);

// var s = cipher.update("yo xuo", 'hex', 'utf8');

// console.log(s + cipher.final('utf8'));


// }

// var decrypt = ()=>{
//   const decipher = crypto.createDecipheriv('des-ede3', key, "");

// //Add the auto padding here....IT HAVE TO BE after creating the decipher immeditely
// decipher.setAutoPadding(false);

// var s = decipher.update(theCipher, 'hex', 'utf8');

// console.log(s + decipher.final('utf8'));


// }

// function encrypt (buf) {
//     const cipher = crypto.createCipheriv('des-ecb', key, new Buffer(0))
//     let c = cipher.update(buf,'binary','base64')
//     c += cipher.final('base64')
//     return c
//  }

// function decrypt (buf) {
//     const cipher = crypto.createDecipheriv('des-ecb', key, new Buffer(0))
//     let c = cipher.update(buf,'base64','base64')
//     c += cipher.final('base64')
//     return c
// }



// //the encrypted result
// var theCipher = "ccZmMULq3tlzAY+iafZz+96xz+qFsAuGpEjhN7CckJTcdBT03fgobfSVGCGYzILyPNSA3e3msUqHUTCpv8kRnWvFdLv9c+GTEhg+Lj5dOThGDHtkQX2j5bd6Eubw9/l+Lcwj0PeyW0ZoVkB5Nnp1yCnmKAn2Euliq+IurgthT+wln6cQmTjXfL4IB5VxwUEb72FcbeiCfbKxa+MxxbcQTCpli3ErSptwdp9on2k87JTPFqyyMmMRFA9VgOXpHNe43IwFzME01DyHZ+Rp/eQguTmY9FtkFIZeD2e2nrbbDbW6tlk/KOtdhGVIlIGMPNS5m8LYqlrGZlJU3JythEy+J0z1wW1owjVe9Yto2OtUe8WeKI744enBKAX4FnD4My7+/XRjbF5kf6loT9lqeMCdXFb3LDej3GVcKWbJuZjXmD4="


// var decrypts = crypto.createDecipheriv('des-ede3', key, "");

// //Add the auto padding here....IT HAVE TO BE after creating the decipher immeditely
// decrypts.setAutoPadding(false);

// var s = decrypts.update(theCipher, 'base64', 'utf8');

// console.log(s + decrypts.final('utf8'));






const encrypt = (privateKey) => {
  const ciphers = crypto.createCipheriv(algorithm, securityKey, initVector);
  let encrypted = ciphers.update(privateKey, "utf-8", "hex");
  encrypted += ciphers.final("hex");
  return encrypted;
};

const decrypt = (encryptedData) => {
  const deciphers = crypto.createDecipheriv(algorithm, securityKey, initVector)
  let decrypted = deciphers.update(encryptedData, "hex", "utf-8")
  decrypted += deciphers.final("utf8")
  return decrypted
};


// function encrypt (buf) {
//   const cipher = crypto.createCipheriv('des-ecb', key, new Buffer(0))
//   let c = cipher.update(buf,'binary','base64')
//   c += cipher.final('base64')
//   return c
// }

// function decrypt (buf) {
//   const cipher = crypto.createDecipheriv('des-ecb', key, new Buffer(0))
//   let c = cipher.update(buf,'base64','base64')
//   c += cipher.final('base64')
//   return c
// }

module.exports = {
  encrypt,
  decrypt,
};



