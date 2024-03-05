export const generarNumeroRandom = (min, max) => {
    return new Promise(async(resolve, reject) => {
    let numeroRandom = Math.floor(Math.random() * (max - min + 1 )) + min;
    resolve(numeroRandom);
    })
}

//  default generarNumeroRandom;