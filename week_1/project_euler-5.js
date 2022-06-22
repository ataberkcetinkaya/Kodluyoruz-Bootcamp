function euler5(sayi) {
    const carpanlar = []; //bos bir array tanimlariz
    
    for(let i = 1; i <= sayi; i++) { //1'den hedefledigimiz sayiya kadar dongu olustururuz
        let dgrCarpanlar = i; //dgrCarpanlar degiskenine dolastigimiz sayiyi atiyoruz
        carpanlar.forEach(function(crpnlr) { //forEach dongusu ile carpanlar arrayini gezecek
            if(dgrCarpanlar % crpnlr == 0) { //carpanlar arrayindeki sayi ile dgrCarpanlar'daki sayi bolunebilir mi diye bakacak
                dgrCarpanlar /= crpnlr; //oyle ise dgrCarpanlar'daki sayi carpanlar arrayindeki sayiyi bolecek
            }
        })
        carpanlar.push(dgrCarpanlar); //carpanlar arrayine push ederiz
    }
    return carpanlar.reduce((nmbr = 1, crpnlr) => nmbr *= crpnlr); //arrayi tek sayiya dusururuz ve return ederiz.
}
console.log(euler5(20));